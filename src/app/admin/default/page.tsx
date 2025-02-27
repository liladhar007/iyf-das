'use client';
// import WeeklyRevenue from 'components/admin/default/WeeklyRevenue';
// import TotalSpent from 'components/admin/default/TotalSpent';
import { IoMdHome } from 'react-icons/io';
import { IoDocuments } from 'react-icons/io5';
import { MdBarChart, MdDashboard } from 'react-icons/md';
import Widget from 'components/widget/Widget';
import CallingSystem from 'components/allifycomponet/callingSystem';

const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Total Amount'}
          subtitle={'Rs 340.5'}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={'Pending Amount'}
          subtitle={'Rs 642.39'}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Total Register'}
          subtitle={'1574'}
        />
        {/* <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={'Data List Report'}
          subtitle={'1,000'}
        /> */}
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Weekly Totel Registered'}
          subtitle={'145'}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={'Total Students'}
          subtitle={'2433'}
        />
      </div>

      {/* Charts */}

      <div className="mt-5">
        {/* <TotalSpent />
        <WeeklyRevenue /> */}
        <h2 className="text-lg font-bold mb-3 dark:text-white">Calling System</h2>
        <CallingSystem/>
      </div>
    </div>
  );
};

export default Dashboard;
