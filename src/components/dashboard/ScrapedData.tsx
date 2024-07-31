import * as React from "react";
import { StoredData } from "../../interfaces/UserProfile";
import UserProfile from "./UserProfile";
import { ActionsBtn } from "../utils/Svgs";
import { truncateString } from "../utils/Common";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../config/apiConfig";
import ApiUrls from "../../config/ApiUrls";

const ScrapedData = ({ open }) => {
  const [allProfiles, setAllProfiles] = React.useState([]);
  const [openUserModal, setOpenUserModal] = React.useState(false);
  const [indexOfClickProfile, setIndexOfClickProfile] = React.useState(-1);
  const [loading, setLoading] = React.useState(false);
  const [companyProfile, setCompanyProfile] = React.useState(null);

  React.useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true); // Set loading to true before the API call
      try {
        const response = await API.get(ApiUrls.LEAD_LIST, {
          params: {
            page: 1,
            limit: 10,
          },
        });

        const leads = response.data.data.leads;
        console.log("Leads:", leads);

        // Filter out profiles where 'company' is true and store the entire profile
        const filteredProfiles = leads.filter((lead) => !lead.features.company);

        setAllProfiles(filteredProfiles);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false); // Set loading to false after the API call
      }
    };

    fetchProfiles();
  }, []);

  const handleProfileClick = (index) => {
    const selectedProfile = allProfiles[index];
    setIndexOfClickProfile(index);
    console.log("selectedProfile", selectedProfile);
    setCompanyProfile(selectedProfile.company_profile);
    setOpenUserModal(true);
  };

  const visibleProfile = allProfiles && allProfiles[indexOfClickProfile];

  // Delete a specific profile
  const deleteProfile = (profileIndex) => {
    const updatedProfiles = [...(allProfiles || [])];
    updatedProfiles.splice(profileIndex, 1);
    setAllProfiles(updatedProfiles);

    // Update Chrome Storage
    chrome.storage.local.set({ profiles: updatedProfiles });
  };

  // Update handleModalClose to call refreshProfiles
  const handleModalClose = () => {
    setOpenUserModal(false);
  };

  return (
    <>
      <div className="scraped-container">
        <header className="flex space-between section-header">
          <h1>Scraped Profiles</h1>
        </header>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : (
          <table className="scraped-table">
            <thead>
              <tr className="row row-th">
                <th style={{ width: "180px" }}>User</th>
                <th>Origin</th>
                <th>Title</th>
                <th>Skills</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allProfiles?.map((profile, index) => (
                <tr
                  className={`row row-td ${
                    profile.features.jobPosted ? "job-posted-row" : ""
                  }`}
                  key={index}
                >
                  <td>
                    <div className="user">
                      <img
                        src={profile.features.personalInfo?.profileImageSrc}
                        alt={profile.features.personalInfo?.profileName}
                        className="table-user__img"
                      />
                      <span>
                        {truncateString(
                          profile.features.personalInfo?.profileName,
                          14
                        )}
                      </span>
                    </div>
                  </td>
                  <td>{profile.features.origin}</td>
                  <td>{profile.features.personalInfo.title}</td>
                  <td>{profile.features.skills.join(", ")}</td>
                  <td>
                    <button onClick={() => handleProfileClick(index)}>
                      <ActionsBtn />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {openUserModal && (
          <div className="modal-user">
            <div className="modal-content-user">
              <span className="close" onClick={handleModalClose}>
                &times;
              </span>
              {visibleProfile && (
                <>
                  <UserProfile
                    visibleProfile={visibleProfile.features}
                    companyProfile={companyProfile}
                  />
                </>
              )}

              <div className="button-container">
                <button
                  className="button button-cancel"
                  onClick={() => setOpenUserModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="button button-delete"
                  onClick={() => {
                    setOpenUserModal(false);
                    deleteProfile(indexOfClickProfile);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default ScrapedData;
