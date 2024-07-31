import React from "react";
import { UpworkIcon } from "../utils/Svgs";
import Twitter, { Row } from "./Twitter";
import Linkedin from "./Linkedin";
import Upwork from "./Upwork";
import { useRef } from "react";

import { colors, generateRandomNumber } from "./Skills";

const UserProfile = ({ visibleProfile, companyProfile }: any) => {
  console.log("companyProfile", companyProfile);
  // };
  return (
    <>
      {Object.keys(companyProfile).length === 0 ? (
        <p>You have not been assigned to any company yet.</p>
      ) : (
        <button
          onClick={() => {
            /* your logic here */
          }}
        >
          View Company Profile
        </button>
      )}
      <div style={{ paddingBottom: "35px" }}>
        {visibleProfile.origin === "twitter" && (
          <h2 className="center user-heading">
            {/* <TwitterIcon className="user-heading__icon" /> */}
            {visibleProfile.origin}
          </h2>
        )}
        <div className="center gap-5">
          <div className="user-details-left  flex-1">
            {visibleProfile.origin === "linkedin" && (
              <h2 className="flex items-center user-heading">
                {/* <LinkedInIcon className="user-heading__icon" /> */}
                {visibleProfile.origin}
              </h2>
            )}
            {visibleProfile.origin === "upwork" && (
              <h2 className="flex items-center user-heading">
                <UpworkIcon />
                {visibleProfile.origin}
              </h2>
            )}
            <div>
              <img
                className="user-img"
                src={visibleProfile.personalInfo.profileImageSrc}
                alt={visibleProfile.personalInfo.profileName}
              />
              <h3 className="user-name">
                {visibleProfile.personalInfo.profileName}
                {visibleProfile.personalInfo.ProfileLink && (
                  <span>
                    <a
                      href={visibleProfile.personalInfo.ProfileLink}
                      target="_blank"
                      className="visit-original"
                    >
                      visit
                    </a>
                  </span>
                )}
              </h3>
              <p className="user-title">{visibleProfile.personalInfo.title}</p>
              {visibleProfile.origin === "upwork" && (
                <div className="flex gap-8 stat-box">
                  <Row
                    title="Level"
                    value={visibleProfile.personalInfo.level}
                  />
                  <Row
                    title="Total Job"
                    value={visibleProfile.personalInfo.totalJob}
                  />
                  <Row
                    title="Total Hour"
                    value={visibleProfile.personalInfo.totalHour}
                  />
                </div>
              )}
            </div>
            {visibleProfile.tags && (
              <ul className="skills">
                {visibleProfile.tags.map((el, i: number) => (
                  <li
                    key={i}
                    style={{
                      backgroundColor: `${colors[generateRandomNumber()]}`,
                    }}
                  >
                    {el.value}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className={`user-details-right ${
              visibleProfile.origin === "twitter" ? "center" : "h-60vh"
            }`}
          >
            {visibleProfile.origin === "twitter" ? (
              <Twitter visibleProfile={visibleProfile} />
            ) : visibleProfile.origin === "linkedin" ? (
              <Linkedin visibleProfile={visibleProfile} />
            ) : (
              <Upwork UpworkProfile={visibleProfile} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
