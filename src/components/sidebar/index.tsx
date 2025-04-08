// /* eslint-disable */

// import { HiX } from 'react-icons/hi';
// import Links from './components/Links';

// import { IRoute } from 'types/navigation';
// import Link from 'next/link';

// function SidebarHorizon(props: { routes: IRoute[]; [x: string]: any }) {
//   const { routes, open, setOpen } = props;
//   return (
//     <div
//       className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
//         open ? 'translate-x-0' : '-translate-x-96 xl:translate-x-0'
//       }`}
//     >
//       <span
//         className="absolute right-4 top-4 block cursor-pointer xl:hidden"
//         onClick={() => setOpen(false)}
//       >
//         <HiX />
//       </span>

//       <div className={`mx-[46px] mt-[50px] flex items-center`}>
//         {/* <div className="ml-1 mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
//           IYF <span className="font-medium">Dashboard</span>
//         </div> */}
//         <Link href="/admin/dashboard">
//   <div className="ml-1 mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white cursor-pointer">
//     IYF <span className="font-medium">Dashboard</span>
//   </div>
// </Link>
//       </div>
//       <div className="mb-7 mt-[58px] h-px bg-gray-300 dark:bg-white/30" />
//       {/* Nav item */}

//       <ul className="mb-auto pt-1">
//         <Links routes={routes} />
//       </ul>

  

//     </div>
//   );
// }

// export default SidebarHorizon;







/* eslint-disable */
import { HiX } from 'react-icons/hi';
import Links from './components/Links';
import { IRoute } from 'types/navigation';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function SidebarHorizon(props: { routes: IRoute[]; [x: string]: any }) {
  const { routes, open, setOpen } = props;
  const [filteredRoutes, setFilteredRoutes] = useState<IRoute[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // userRole को lowercase और trim करके प्राप्त करें
      const userRole = localStorage.getItem('role')?.toLowerCase().trim();
      console.log('🧠 User Role:', userRole);
      console.log('📦 All Routes:', routes);

      routes.forEach(route => {
        console.log(
          `🔍 Route: ${route.name} | roles: ${JSON.stringify(route.roles)} | Type: ${typeof route.roles}`
        );
      });

      if (userRole) {
        const filtered = routes.filter(route => {
          const lowerCaseRoles = route.roles?.map(r => r.toLowerCase());
          const includesRole = lowerCaseRoles?.includes(userRole);
          console.log(
            `👉 Checking route "${route.name}": lowerCaseRoles = ${JSON.stringify(lowerCaseRoles)} , includes "${userRole}" = ${includesRole}`
          );
          return includesRole;
        });
        console.log('✅ Filtered Routes:', filtered);
        setFilteredRoutes(filtered);
      } else {
        setFilteredRoutes([]);
      }
    }
  }, [routes]);

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? 'translate-x-0' : '-translate-x-96 xl:translate-x-0'
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={() => setOpen(false)}
      >
        <HiX />
      </span>

      <div className="mx-[46px] mt-[50px] flex items-center">
        <Link href="/admin/dashboard">
          <div className="ml-1 mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white cursor-pointer">
            IYF <span className="font-medium">Dashboard</span>
          </div>
        </Link>
      </div>

      <div className="mb-7 mt-[58px] h-px bg-gray-300 dark:bg-white/30" />

      <ul className="mb-auto pt-1">
        <Links routes={filteredRoutes} />
      </ul>
    </div>
  );
}

export default SidebarHorizon;
