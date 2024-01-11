import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import { SearchSharp, Person } from "@mui/icons-material/";

type FooterProps = {
	value: number;
	setValue: React.Dispatch<React.SetStateAction<number>>;
};

const Footer: React.FC<FooterProps> = ({ value, setValue }) => {
	const handleClick = (newVal: number) => {};

	return (
		<Box width="100%" marginBottom={2}>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
					handleClick(newValue);
				}}
			>
				<BottomNavigationAction label="Profile" icon={<Person />} />
				<BottomNavigationAction label="Search" icon={<SearchSharp />} />
				<BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
			</BottomNavigation>
		</Box>
	);
};

export default Footer;
