import axios from "axios";

export class CalendarService {
  async getMonths() {
    const headers = {
      "Content-Type": "application/json",
    };

    const url = `https://v1.igpods.com/api/social_calendar/all_months`;

    const response = await axios.request({
      method: "get",
      url,
      headers,
    });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        throw new Error();
    }
  }

  async getMonth(name) {
    const headers = {
      "Content-Type": "application/json",
    };

    const url = `https://v1.igpods.com/api/social_calendar/get/${name}`;

    const response = await axios.request({
      method: "get",
      url,
      headers,
    });

    switch (response.status) {
      case 200:
        return response.data;
      default:
        throw new Error();
    }
  }
}
