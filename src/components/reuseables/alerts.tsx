import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { AlertOptions } from "../Models/Alerts/alertsModel";
import { useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const Alert = async (options: AlertOptions) => {
  switch (options.type) {
    case 'Updated':
      withReactContent(Swal).fire({
        title: options.title,
        text: options.message,
        icon: 'success'
      });
      break;
    case 'EndStream':
      withReactContent(Swal).fire({
        title: "Are you sure you want to end the stream?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          EndStream(options.streamID!, options.token!);

        } else if (result.isDenied) {
        }
      }
      );
      break;
    case 'ban':
      withReactContent(Swal).fire({
        title: "What type of ban would you like to give them?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Permanent",
        denyButtonText: `Temporary`,
        cancelButtonText: "Canel Process"
      }).then((result) => {
        /* Permanent Ban Modal */
        if (result.isConfirmed) {
          Swal.showLoading()
        } else if (result.isDenied) {
          /* Temp ban modal */

          TempTimeLine(options.userID!, options.token!);
        }
      }
      );
  }
  const EndStream = async (streamID: string, tokenSaved: string) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}admin/endStream/${streamID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenSaved}`,
        },
      }
    );
    if (response.ok) {
      Swal.fire({
        title: "Stream Ended",
        text: "The stream has been ended!",
        icon: "success"
      });
    }
  }
  const BanRequest = async (banType: string, userID: string, numDays: number, authToken: string) => {
    Swal.isLoading()
    Swal.showLoading()
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}admin/banUser`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,

      },
      body: JSON.stringify(banType === "permanent" ? {
        userId: userID,
        ban_type: 'permanent',
        ban_reason: 'Permanent testing',
      } : {
        userId: userID,
        ban_type: 'temporary',
        ban_reason: 'Something testing',
        ban_days: numDays
      }),
    }
    );

    if (response.ok) {
      Swal.hideLoading();
      Swal.fire({
        title: "Account Status Updated",
        text: "The Account was banned!",
        icon: "success"
      });
    }
  }
  const TempTimeLine = async (userID: string, authToken: string) => {

    const { value: formValues } = await Swal.fire({
      title: "Please select a temporary ban timeline",
      input: "select",
      inputOptions: {
        Days: {
          threeDays: "3 days ban",
          sixDays: "6 days ban",
        },
        Week: {
          twoWeeks: "2 weeks Ban",
          threeWeeks: "3 weeks ban"
        },
        Months: {
          oneMonth: "1 Month",
          twoMonth: "2 Month",
          threeMonth: "3 Month"
        },
      },
      customClass: {
        input: ""
      },
      inputPlaceholder: "Ban Timeline",
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          resolve();
        });
      }
    });
    if (formValues) {
      var numDays = 0;
      switch (formValues) {
        case "threeDays":
          numDays = 3;
          break;
        case "sixDays":
          numDays = 6;
          break;
        case "twoWeeks":
          numDays = 14;
          break;
        case "threeWeeks":
          numDays = 21;
          break;
        case "oneMonth":
          numDays = 30;
          break;
        case "twoMonth":
          numDays = 60;
          break;
        case "threeMonth":
          numDays = 90;
          break;
      }
      BanRequest('temporary', userID, numDays, authToken);

    }

  }
}

export default Alert

