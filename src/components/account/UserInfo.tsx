import { UserInterface } from '@/interface/interface';
import { shortenLongString } from '@/utils/helpers';
import { useState } from 'react';


const UserInfo = ({ user }: { user: UserInterface }) => {

  const [viewAll, setViewAll] = useState(false);
  return (
    <div className="w-full md:max-w-md p-4 bg-white border border-gray-200 text-black rounded-lg shadow sm:p-8 dark:bg-slate-800 dark:text-white dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold text-primary">User Info</h5>
        <div
          onClick={() => setViewAll(!viewAll)}
          className="text-sm font-medium text-info hover:underline cursor-pointer"
        >
          {viewAll ? 'View Less' : 'View All'}
        </div>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div>First Name</div>
              <div
                className=" text-slate-500 dark:text-slate-300
                    "
              >
                {user?.firstName || 'N/A'}
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div>Last Name</div>
              <div
                className=" text-slate-500 dark:text-slate-300
                    "
              >
                {user?.lastName || 'N/A'}
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div>Email</div>
              <div
                className=" text-slate-500 dark:text-slate-300
                    "
              >
                {user?.email || 'N/A'}
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div>Phone</div>
              <div
                className=" text-slate-500 dark:text-slate-300
                    "
              >
                {user?.phoneNumber || 'N/A'}
              </div>
            </div>
          </li>
          {viewAll && (
            <>
              <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div>Address</div>
                  <div
                    className=" text-slate-500 dark:text-slate-300
                    "
                  >
                    {user?.address || 'N/A'}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div>Region</div>
                  <div
                    className=" text-slate-500 dark:text-slate-300
                    "
                  >
                    {user?.region || 'N/A'}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div>Country</div>
                  <div
                    className=" text-slate-500 dark:text-slate-300
                    "
                  >
                    {user?.country || 'N/A'}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div>Twitter</div>
                  <div
                    className=" text-slate-500 dark:text-slate-300
                    "
                  >
                    {user?.social?.twitter
                      ? shortenLongString(user?.social?.twitter, 20)
                      : 'N/A'}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div>Facebook</div>
                  <div
                    className=" text-slate-500 dark:text-slate-300
                        "
                  >
                    {user?.social?.facebook
                      ? shortenLongString(user?.social?.facebook, 20)
                      : 'N/A'}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div>Instagram</div>
                  <div
                    className=" text-slate-500 dark:text-slate-300
                        "
                  >
                    {user?.social?.instagram
                      ? shortenLongString(user?.social?.instagram, 20)
                      : 'N/A'}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div>LinkedIn</div>
                  <div
                    className=" text-slate-500 dark:text-slate-300
                        "
                  >
                    {user?.social?.linkedin
                      ? shortenLongString(user?.social?.linkedin, 20)
                      : 'N/A'}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div>Website</div>
                  <a
                    className="text-slate-500 dark:text-slate-300"
                    href={user?.social?.website}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {user?.social?.website
                      ? shortenLongString(user?.social?.website, 20)
                      : 'N/A'}
                  </a>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserInfo;
