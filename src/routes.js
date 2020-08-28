import Dashboard from "views/Dashboard.js";
import Investment from "views/Investment.js";
import Withdrawal from "views/Withdrawal.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import Transactions from "views/Transactions";

// let token = localStorage.getItem("auth-token");
// let admin = jwt.decode(token);
// if (token && admin.admin) {
export const admin = [
	{
		path: "/user",
		name: "Dashboard",
		icon: "tim-icons icon-chart-pie-36",
		component: Dashboard,
		layout: "/dashboard",
	},
	{
		path: "/investment",
		name: "Invest",
		icon: "tim-icons icon-money-coins",
		component: Investment,
		layout: "/dashboard",
	},
	{
		path: "/withdrawals",
		name: "Request Withdrawal",
		icon: "tim-icons icon-bank",
		component: Withdrawal,
		layout: "/dashboard",
	},
	{
		path: "/user-profile",
		name: "User Profile",
		icon: "tim-icons icon-single-02",
		component: UserProfile,
		layout: "/dashboard",
	},
	{
		path: "/transactions",
		name: "Transactions",
		icon: "tim-icons icon-lock-circle",
		component: Transactions,
		layout: "/dashboard",
	},
	{
		path: "/tables",
		name: "Admin Transactions",
		icon: "tim-icons icon-puzzle-10",
		component: TableList,
		layout: "/dashboard",
	},
	{
		path: "/typography",
		name: "Admin all users",
		icon: "tim-icons icon-lock-circle",
		component: Typography,
		layout: "/dashboard",
	},
];
// } else {
export const user = [
	{
		path: "/user",
		name: "Dashboard",
		icon: "tim-icons icon-chart-pie-36",
		component: Dashboard,
		layout: "/dashboard",
	},
	{
		path: "/investment",
		name: "Invest",
		icon: "tim-icons icon-money-coins",
		component: Investment,
		layout: "/dashboard",
	},
	{
		path: "/withdrawals",
		name: "Request Withdrawal",
		icon: "tim-icons icon-bank",
		component: Withdrawal,
		layout: "/dashboard",
	},
	{
		path: "/user-profile",
		name: "User Profile",
		icon: "tim-icons icon-single-02",
		component: UserProfile,
		layout: "/dashboard",
	},
	{
		path: "/transactions",
		name: "Transactions",
		icon: "tim-icons icon-lock-circle",
		component: Transactions,
		layout: "/dashboard",
	},
];
// }

// var routes = [...admin];
// export default routes;
