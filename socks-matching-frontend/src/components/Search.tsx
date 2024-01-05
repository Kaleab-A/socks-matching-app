import Webcam from "react-webcam";

const Search = () => {
	return (
		<div>
			<h1>Search</h1>
			<Webcam />
			<input
				accept="image/*"
				id="icon-button-file"
				type="file"
				capture="environment"
			/>
		</div>
	);
};

export default Search;
