'use client';
import Default from 'components/auth/variants/DefaultAuthLayout';

function SignInDefault() {
  return (
    <Default
      maincard={
        <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
          {/* Sign in section */}
          <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h3 className="mb-4 text-4xl font-bold text-navy-700 dark:text-white text-center">
              Sign In...
            </h3>

            {/* Email */}
            <div className="w-full mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email*
              </label>
              <input
                id="email"
                type="email"
                placeholder="mail@simmmple.com"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400"
              />
            </div>

            {/* Password */}
            <div className="w-full mb-4">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password*
              </label>
              <input
                id="password"
                type="password"
                placeholder="Min. 8 characters"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400"
              />
            </div>

            {/* Sign In Button */}
            <button className="w-full py-3 text-base font-medium text-white bg-blue-600 rounded-lg transition hover:bg-blue-700 active:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-400 dark:active:bg-blue-600 dark:focus:ring-blue-400">
              Sign In
            </button>
          </div>
        </div>
      }
    />
  );
}

export default SignInDefault;
