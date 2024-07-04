$(document).ready(function() {
	$('#calendar').evoCalendar({
		 theme: "Midnight Blue",
		 calendarEvents: [
			  {
					id: 'event1',
					name: "New Yearjhgfchjkljhgfdxcvghbkjnmhbdcxnkm,l.mk,njbvc",
					date: "January/1/2024",
					type: "holiday",
					description: "today you have cancer patient",
					everyYear: true
			  },
			  {
					name: "symptoms fghjkijhgfvbjkihgfcvbhjgfdxcxvhvjgfdzsfxgchjgfxdcz",
					badge: "02/13 - 02/15",
					date: ["February/13/2024", "February/15/2024"],
					description: "Vacation leave for 3 days.",
					type: "event",
					color: "#63d867"
			  }
		 ]
	});
});