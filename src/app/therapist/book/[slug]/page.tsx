import React from "react";

function BookingPage({ params }: { params: { slug: string } }) {
	return <div className="text-black">{params.slug}</div>;
}

export default BookingPage;
