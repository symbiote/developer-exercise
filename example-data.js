
const DataSet = {
    stops: [
        {
            id: "2273",
            mode: "tram",
            title: "Clarendon St/Park St #24",
        },
        {
            id: "1071",
            mode: "train",
            title: "Flinders Street Station",
        },
        {
            id: "31845",
            mode: "bus",
            title: "Footscray Station / Irving St",
        }
    ],
    routes: [
        {
            id: "721",
            mode: "tram",
            title: "East Coburg",
            directions: {
                "0": "East Coburg",
                "1": "South Melbourne",
            }
        },
        {
            id: "16",
            mode: "train",
            title: "Werribee",
            directions: {
                "15": "Werribee",
                "14": "City",
            }
        },
        {
            id: "7442",
            mode: "bus",
            title: "Sunshine",
            directions: {
                "18": "Sunshine",
                "19": "Footscray",
            }
        }
    ],
    departures: [
        {
            stop_id: "2273",
            route_id: "721",
            direction: "0",
            departure_time_utc: "2019-03-21T02:00:00Z"
        },
        {
            stop_id: "2273",
            route_id: "721",
            direction: "0",
            departure_time_utc: "2019-03-21T02:12:00Z"
        },
        {
            stop_id: "2273",
            route_id: "721",
            direction: "0",
            departure_time_utc: "2019-03-21T02:24:00Z"
        },
        {
            stop_id: "1071",
            route_id: "16",
            direction: "15",
            departure_time_utc: "2019-03-21T02:17:00Z"
        },
        {
            stop_id: "1071",
            route_id: "16",
            direction: "15",
            departure_time_utc: "2019-03-21T02:21:00Z"
        },
        {
            stop_id: "31845",
            route_id: "7442",
            direction: "18",
            departure_time_utc: "2019-03-21T02:16:00Z"
        },
        {
            stop_id: "31845",
            route_id: "7442",
            direction: "18",
            departure_time_utc: "2019-03-21T02:36:00Z"
        },
        {
            stop_id: "31845",
            route_id: "7442",
            direction: "18",
            departure_time_utc: "2019-03-21T02:56:00Z"
        },
    ]
}

export default DataSet;
