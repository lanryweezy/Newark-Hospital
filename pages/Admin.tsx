
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { UsersIcon, CalendarIcon, BedIcon, DollarSignIcon, BarChartIcon, BellIcon } from '../components/IconComponents';

const statsCards = [
    { title: "Total Patients", value: "1,284", trend: "+5.2% this month", icon: UsersIcon, color: "blue" },
    { title: "Appointments Today", value: "76", trend: "12 upcoming", icon: CalendarIcon, color: "green" },
    { title: "Bed Occupancy", value: "85%", trend: "9 beds free", icon: BedIcon, color: "yellow" },
    { title: "Monthly Revenue", value: "₦45.8M", trend: "+8.9% vs last month", icon: DollarSignIcon, color: "red" },
];

const weeklyAppointments = [
    { day: 'Mon', count: 65 },
    { day: 'Tue', count: 82 },
    { day: 'Wed', count: 75 },
    { day: 'Thu', count: 90 },
    { day: 'Fri', count: 85 },
    { day: 'Sat', count: 45 },
    { day: 'Sun', count: 30 },
];

const recentActivity = [
    { text: "New patient registered: Tunde Adebayo", time: "2m ago" },
    { text: "Dr. Okoro updated her weekly schedule.", time: "1h ago" },
    { text: "Invoice #INV-5829 paid successfully.", time: "3h ago" },
    { text: "Low stock alert for Atorvastatin.", time: "5h ago" },
];

const StatsCard: React.FC<{ card: typeof statsCards[0] }> = ({ card }) => {
    const colorClasses = {
        blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
        green: { bg: 'bg-green-100', text: 'text-green-600' },
        yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
        red: { bg: 'bg-red-100', text: 'text-red-600' },
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-start justify-between transform hover:-translate-y-2 transition-all duration-300">
            <div>
                <p className="text-sm font-medium text-slate">{card.title}</p>
                <p className="text-3xl font-bold text-primary mt-1">{card.value}</p>
                <p className="text-xs text-slate-dark mt-2">{card.trend}</p>
            </div>
            <div className={`p-3 rounded-full ${colorClasses[card.color as keyof typeof colorClasses].bg}`}>
                <card.icon className={`h-6 w-6 ${colorClasses[card.color as keyof typeof colorClasses].text}`} />
            </div>
        </div>
    );
};


const Admin: React.FC = () => {
    const maxAppointments = Math.max(...weeklyAppointments.map(d => d.count), 1); // Avoid division by zero

    return (
        <PageWrapper
            title="Admin Dashboard"
            subtitle="Overview of hospital operations and key metrics."
        >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsCards.map(card => <StatsCard key={card.title} card={card} />)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Appointments Overview */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-xl">
                    <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
                        <BarChartIcon className="h-6 w-6 mr-3 text-primary-lightest" />
                        Appointments Overview (This Week)
                    </h2>
                    <div className="flex items-end justify-between h-64 space-x-2 sm:space-x-4 pt-4 border-t border-gray-100">
                        {weeklyAppointments.map((item, index) => (
                            <div key={item.day} className="flex-1 flex flex-col items-center justify-end group">
                                <div className="text-sm font-bold text-primary-lightest opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mb-1">{item.count}</div>
                                <div
                                    className="w-full bg-gradient-to-b from-secondary/50 to-secondary rounded-t-md hover:from-secondary/70 hover:to-secondary transition-all duration-300 animate-fade-in-up"
                                    style={{ height: `${(item.count / maxAppointments) * 100}%`, animationDelay: `${index * 50}ms`, opacity: 0 }}
                                    title={`${item.count} appointments`}
                                ></div>
                                <div className="text-xs font-semibold text-slate mt-2">{item.day}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-lg shadow-xl">
                    <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
                        <BellIcon className="h-6 w-6 mr-3 text-primary-lightest" />
                        Recent Activity
                    </h2>
                    <ul className="space-y-4">
                        {recentActivity.map((activity, index) => (
                             <li key={index} className="flex items-start">
                                <div className="flex-shrink-0 w-2 h-2 bg-primary-lightest rounded-full mt-2 mr-3"></div>
                                <div>
                                    <p className="text-sm text-slate-dark">{activity.text}</p>
                                    <p className="text-xs text-slate">{activity.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-bold text-primary mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-primary text-white font-bold py-2 px-5 rounded-md hover:bg-primary-light transition-all duration-300">
                        Add New Doctor
                    </button>
                    <button className="bg-primary text-white font-bold py-2 px-5 rounded-md hover:bg-primary-light transition-all duration-300">
                        Manage Appointments
                    </button>
                     <button className="bg-primary text-white font-bold py-2 px-5 rounded-md hover:bg-primary-light transition-all duration-300">
                        View Billing
                    </button>
                     <button className="bg-secondary text-white font-bold py-2 px-5 rounded-md hover:bg-secondary/90 transition-all duration-300">
                        Send Announcement
                    </button>
                </div>
            </div>

        </PageWrapper>
    );
};

export default Admin;
