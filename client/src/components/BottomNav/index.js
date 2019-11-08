import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Icon from "@material-ui/core/Icon";

import bottomNavConfig from "../../config/bottomNav";

const BottomNav = props => {
	const { value, handleChange, className } = props;

	return (
		<BottomNavigation
			value={value}
			onChange={handleChange}
			className={className}
		>
			<BottomNavigationAction
				label="Profile"
				value={bottomNavConfig.values.profile}
				icon={<Icon>account_circle</Icon>}
			/>
			<BottomNavigationAction
				label="Tasks"
				value={bottomNavConfig.values.tasks}
				icon={<Icon>assignments</Icon>}
			/>
			<BottomNavigationAction
				label="Transactions"
				value={bottomNavConfig.values.transactions}
				icon={<Icon>attach_money</Icon>}
			/>
			<BottomNavigationAction
				label="Records"
				value={bottomNavConfig.values.records}
				icon={<Icon>dashboard</Icon>}
			/>
		</BottomNavigation>
	);
};

export default BottomNav;
