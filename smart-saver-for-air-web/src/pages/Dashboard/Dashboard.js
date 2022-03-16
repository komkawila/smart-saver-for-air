import React, { useState, useEffect, useRef } from "react";

import { NavLink, useHistory } from "react-router-dom";
import useChat from "../../module/useChat";
import Swal from "sweetalert2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import faker from "faker";
import { Line } from "react-chartjs-2";
import "./Dashboard.css";
import Switch from "react-switch";
import axios from "axios";
import Slider from "react-input-slider";
import GaugeChart from "react-gauge-chart";
import Thermometer from "react-thermometer-component";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["0", "1", "2", "3", "4", "5", "6"];
const labelstemp2 = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];
const labelstemp = [10, 20, 30, 20, 25, 21, 25, 30, 11, 11, 12, 13, 14];

const dataTemp = {
  labelstemp,
  datasets: [
    {
      label: "Temperature",

      data: labelstemp,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};
const dataSlope = {
  labels,
  datasets: [
    {
      label: "Slope",

      data: labels.map(() => faker.datatype.number({ min: 12, max: 28 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};
const dataPulse = {
  labels,
  datasets: [
    {
      label: "Pulse",

      data: labels.map(() => faker.datatype.number({ min: 12, max: 28 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};
const dataSleep = {
  labels,
  datasets: [
    {
      label: "Sleep",

      data: labels.map(() => faker.datatype.number({ min: 12, max: 28 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};
export const optionsTemperature = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: true,
      text: "Temperature",
    },
  },
  scales: {
    x: {
      type: "linear",
      min: 0,
    },
    y: {
      type: "linear",
      min: 10,
      max: 30,
    },
  },
};
export const optionsSlopeTemperature = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: true,
      text: "Slope of Temperature",
    },
  },
  scales: {
    x: {
      type: "linear",
      min: 0,
    },
    y: {
      type: "linear",
      min: 10,
      max: 30,
    },
  },
};

export const optionsPulse = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: true,
      text: "Pulse",
    },
  },
  scales: {
    x: {
      type: "linear",
      min: 0,
    },
    y: {
      type: "linear",
      min: 10,
      max: 30,
    },
  },
};

export const optionsSleep = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: true,
      text: "Sleep",
    },
  },
  scales: {
    x: {
      type: "linear",
      min: 0,
    },
    y: {
      type: "linear",
      min: 10,
      max: 30,
    },
  },
};
function Dartboard() {
  const history = useHistory();
  // console.log(history.location.state.id);
  // console.log(labelstemp);
  const [checked, setchecked] = useState(false);
  const [checkedsleep, setcheckedsleep] = useState(false);
  const [checkednight, setcheckednight] = useState(false);
  const [checkedlogo, setcheckedlogo] = useState(false);

  const [datas, setcDatas] = useState([]);
  const [config_id, setConfig_id] = useState([]);
  const [users, setUsers] = useState([]);
  const handleChange = () => {
    setchecked(!checked);
    sendMessage("AT+TOGGLE=" + (!checked ? 1 : 0));

    axios.put(
      "https://sttslife-api.sttslife.co/users/enable/" +
        history.location.state.id,
      {
        user_enable: !checked ? 1 : 0,
      }
    );
  };

  const handleChangeSleep = () => {
    setcheckedsleep(!checkedsleep);
    sendMessage("AT+SLEEP=" + (!checkedsleep ? 1 : 0));
    axios.put(
      "https://sttslife-api.sttslife.co/users/sleepmode/" +
        history.location.state.id,
      {
        sleepmode: !checkedsleep ? 1 : 0,
      }
    );
  };
  const handleChangeNight = () => {
    setcheckednight(!checkednight);
    sendMessage("AT+NIGHT=" + (!checkednight ? 1 : 0));
    axios.put(
      "https://sttslife-api.sttslife.co/users/nightmode/" +
        history.location.state.id,
      {
        nightmode: !checkednight ? 1 : 0,
      }
    );
  };
  const handleChangeLogo = () => {
    setcheckedlogo(!checkedlogo);
    sendMessage("AT+LOGO=" + (!checkedlogo ? 1 : 0));
    axios.put(
      "https://sttslife-api.sttslife.co/users/logo/" +
        history.location.state.id,
      {
        logo: !checkedlogo ? 1 : 0,
      }
    );
  };

  const { messages, sendMessage } = useChat(history.location.state.id);

  const [pulses, setPulse] = useState(0);

  const countRef = useRef(0);
  const [config, setConfig] = useState([]);
  const fetchAPI = async () => {
    await axios
      .get(
        "https://sttslife-api.sttslife.co/config/" + history.location.state.id
      )
      .then((res) => {
        setConfig(res.data);
      });
    await axios
      .get(
        "https://sttslife-api.sttslife.co/users/" + history.location.state.id
      )
      .then((res) => {
        console.log(
          "https://sttslife-api.sttslife.co/config/id/" +
            res.data.message[0].user_modes
        );
        axios
          .get(
            "https://sttslife-api.sttslife.co/config/id/" +
              res.data.message[0].user_modes
          )
          .then((res) => {
            // console.log(res.data);
            setConfig_id(res.data.message[0]);
          });
        setchecked(res.data.message[0].user_enable === 0 ? false : true);
        setcheckedsleep(res.data.message[0].sleepmode === 0 ? false : true);
        setcheckednight(res.data.message[0].nightmode === 0 ? false : true);
        setcheckedlogo(res.data.message[0].logo === 0 ? false : true);
        setUsers(res.data);
        setPulse(res.data.message[0].user_pulseset);
        // setPulse
      });
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  useEffect(() => {
    try {
      console.log(datas);
      setcDatas(JSON.parse(messages));
    } catch {
      try {
        const body = messages.body;
        if (body.indexOf("AT+TOGGLE=") !== -1) {
          const status =
            parseInt(body.substring(body.indexOf("=") + 1, body.length)) === 0
              ? false
              : true;
          setchecked(status);
          console.log("AT+TOGGLE = #");
          console.log(status);
          axios.put(
            "https://sttslife-api.sttslife.co/users/enable/" +
              history.location.state.id,
            {
              user_enable: status,
            }
          );
        } else if (body.indexOf("AT+LOGO=") !== -1) {
          const status =
            parseInt(body.substring(body.indexOf("=") + 1, body.length)) === 0
              ? false
              : true;
          setcheckedlogo(status);
          console.log("AT+LOGO = #");
          console.log(status);
          axios.put(
            "https://sttslife-api.sttslife.co/users/logo/" +
              history.location.state.id,
            {
              logo: status,
            }
          );
        } else if (body.indexOf("AT+SLEEP=") !== -1) {
          const status =
            parseInt(body.substring(body.indexOf("=") + 1, body.length)) === 0
              ? false
              : true;
          setcheckedsleep(status);
          console.log("AT+SLEEP = #");
          console.log(status);
          axios.put(
            "https://sttslife-api.sttslife.co/users/sleepmode/" +
              history.location.state.id,
            {
              sleepmode: status,
            }
          );
        } else if (body.indexOf("AT+NIGHT=") !== -1) {
          const status =
            parseInt(body.substring(body.indexOf("=") + 1, body.length)) === 0
              ? false
              : true;
          setcheckednight(status);
          console.log("AT+NIGHT = #");
          console.log(status);
          axios.put(
            "https://sttslife-api.sttslife.co/users/nightmode/" +
              history.location.state.id,
            {
              nightmode: status,
            }
          );
        } else if (body.indexOf("AT+MODE=") !== -1) {
          const config_id = parseInt(
            body.substring(body.indexOf("=") + 1, body.length)
          );
          console.log("AT+MODE = " + config_id);
          axios.put(
            "https://sttslife-api.sttslife.co/users/modes/" +
              history.location.state.id,
            {
              user_modes: config_id,
            }
          );
          fetchAPI();
        } else if (body.indexOf("AT+PULSE=") !== -1) {
          const user_pulseset = parseInt(
            body.substring(body.indexOf("=") + 1, body.length)
          );
          console.log("AT+PULSE = " + user_pulseset);
          axios.put(
            "https://sttslife-api.sttslife.co/users/pulse/" +
              history.location.state.id,
            {
              user_pulseset: user_pulseset,
            }
          );
          setPulse(user_pulseset);
        }
      } catch {}
    }
  }, [messages]);

  const swalert = (text) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: text,
      showConfirmButton: false,
      timer: 2500,
    });
  };
  async function handelOnClick(e, key) {
    console.log("AT+MODE=" + e.config_id);
    await swalert("เปลี่ยนโหมดสำเร็จ");
    await sendMessage("AT+MODE=" + e.config_id + "|" + key);
    await axios.put(
      "https://sttslife-api.sttslife.co/users/modes/" +
        history.location.state.id,
      {
        user_modes: e.config_id,
      }
    );
    await fetchAPI();
  }

  const saveConfig = () => {
    console.log(config_id);
    Swal.fire({
      title: "คุณต้องการบันทึกข้อมูล?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "บันทึก",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            "https://sttslife-api.sttslife.co/config/" + config_id.config_id,
            {
              config_slope: config_id.config_slope,
              config_tempcutoff: config_id.config_tempcutoff,
              config_templeak: config_id.config_templeak,
              config_timeleak: config_id.config_timeleak,
              config_time1: config_id.config_time1,
              config_time2: config_id.config_time2,
              config_time3: config_id.config_time3,
              config_sleep: config_id.config_sleep,
              config_pulsecount: config_id.config_pulsecount,
              config_name: config_id.config_name,
            }
          )
          .then((data) => {
            if (!data.data.err) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "บันทึกข้อมูลสำเร็จ",
                showConfirmButton: false,
                timer: 1000,
              });
              sendMessage("AT+SET");
              setTimeout(() => {
                fetchAPI();
              }, 500);
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "บันทึกข้อมูลไม่สำเร็จ",
                showConfirmButton: false,
                timer: 1000,
              });
            }
          });
      }
    });
  };
  const addmodes = () => {
    Swal.fire({
      title: "กรุณากรอกชื่อโหมด",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "เพิ่มโหมด",
      showLoaderOnConfirm: true,
      preConfirm: (text) => {
        console.log(text);
        return axios.post("https://sttslife-api.sttslife.co/config", {
          user_id: history.location.state.id,
          config_name: text,
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      console.log(result.value.data);
      if (result.isConfirmed) {
        swalert("เพิ่มโหมดสำเร็จ");
        fetchAPI();
      }
    });
  };

  const deletemode = () => {
    // deletemode
    Swal.fire({
      title: "ต้องการลบโหมด ?",
      text: "คุณต้องการลบโหมด ใช่หรือไม่!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ต้องการลบโหมด",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            "https://sttslife-api.sttslife.co/config/" + config_id.config_id
          )
          .then((res) =>
            res.data.message.affectedRows
              ? Swal.fire("ลบข้อมูล!", "ลบข้อมูล สำเร็จ", "success")
              : Swal.fire("ลบข้อมูล!", "ลบข้อมูล ไม่สำเร็จ", "error")
          );
        axios
          .put(
            "https://sttslife-api.sttslife.co/users/modes/" +
              history.location.state.id,
            {
              user_modes: 1,
            }
          )
          .then(() => fetchAPI());
      }
    });
  };

  const changePulse = (e) => {
    countRef.current = e;
    setPulse(e);
  };

  function unpressPulse() {
    sendMessage("AT+PULSE=" + countRef.current);
  }

  if (config_id)
    return (
      <div className="">
        <div className="row">
          <div className="col-md-12 mx-0 mt-1">
            <div className="card ">
              <div className="row">
                <div
                  class="card text-center ml-3 mt-1 col-md-2 "
                  style={{ backgroundColor: "#2F9973" }}
                >
                  <div class="card-header" style={{ color: "#fff" }}>
                    <h5>อุณหภูมิ</h5>
                  </div>
                  <div class="card-body" style={{ color: "#fff" }}>
                    {/* <h5 class="card-title">Special title treatment</h5> */}
                    <h6 class="card-text" style={{ color: "#fff" }}>
                      {datas.temp} °C
                    </h6>
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                  </div>
                </div>

                <div
                  class="card text-center ml-2 mt-1 col-md-2"
                  style={{ backgroundColor: "#2F9973" }}
                >
                  <div class="card-header" style={{ color: "#fff" }}>
                    <h5>อุณหภูมิเฉลี่ย</h5>
                  </div>
                  <div class="card-body">
                    {/* <h5 class="card-title">Special title treatment</h5> */}
                    <h6 class="card-text" style={{ color: "#fff" }}>
                      {datas.avgt} °C
                    </h6>
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                  </div>
                </div>

                <div
                  class="card text-center ml-2 mt-1 col-md-2"
                  style={{ backgroundColor: "#2F9973" }}
                >
                  <div class="card-header" style={{ color: "#fff" }}>
                    <h5>SLOPE</h5>
                  </div>
                  <div class="card-body">
                    <h6 class="card-text" style={{ color: "#fff" }}>
                      {datas.slope}
                    </h6>
                  </div>
                </div>

                <div
                  class="card text-center ml-2 mt-1 col-md-2 "
                  style={{ backgroundColor: "#2F9973" }}
                >
                  <div class="card-header" style={{ color: "#fff" }}>
                    <h5>TIME</h5>
                  </div>
                  <div class="card-body">
                    <h6 class="card-text" style={{ color: "#fff" }}>
                      {datas.t}
                    </h6>
                  </div>
                </div>

                <div
                  class="card text-center ml-2 mt-1 col-md-2 "
                  style={{ backgroundColor: "#2F9973" }}
                >
                  <div class="card-header" style={{ color: "#fff" }}>
                    <h5>SLEEP</h5>
                  </div>
                  <div class="card-body">
                    <h6 class="card-text" style={{ color: "#fff" }}>
                      {datas.sleeps}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Temperature*/}
          <div className="col-md-9 mx-0">
            <div className="card">
              <div
                className="card-header"
                style={{ backgroundColor: "#2F9973", margin: 5 }}
                // style={{ margin: 5 }}
              >
                <h3
                  className="card-title"
                  style={{ color: "white", backgroundColor: "#2F9973" }}
                >
                  <i className="fas fa-th mr-2" />
                  กราฟ
                </h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                  >
                    <i className="fas fa-minus" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="chart">
                  <Line
                    options={optionsTemperature}
                    data={dataTemp}
                    style={{
                      minHeight: 150,
                      height: 150,
                      maxHeight: 150,
                      maxWidth: "100%",
                    }}
                  />
                </div>
                <div className="chart">
                  <Line
                    options={optionsSlopeTemperature}
                    data={dataSlope}
                    style={{
                      minHeight: 150,
                      height: 150,
                      maxHeight: 150,
                      maxWidth: "100%",
                    }}
                  />
                </div>
                <div className="chart">
                  <Line
                    options={optionsPulse}
                    data={dataPulse}
                    style={{
                      minHeight: 150,
                      height: 150,
                      maxHeight: 150,
                      maxWidth: "100%",
                    }}
                  />
                </div>
                <div className="chart">
                  <Line
                    options={optionsSleep}
                    data={dataSleep}
                    style={{
                      minHeight: 150,
                      height: 150,
                      maxHeight: 150,
                      maxWidth: "100%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* setting */}
          <div className="col-md-3 mx-0 mt-0">
            <div
              className="card bg-gradient"
              // style={{ backgroundColor: "#d5e8d9" }}
            >
              <div
                className="card-header border-0 "
                style={{ margin: 5, backgroundColor: "#2F9973" }}
              >
                <h3 className="card-title" style={{ color: "white" }}>
                  <i className="fas fa-wrench mr-1" />
                  ตั้งค่าระบบ
                </h3>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Switch onChange={handleChange} checked={checked} />
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-sm"
                    data-card-widget="collapse"
                    style={{ color: "white" }}
                  >
                    <i className="fas fa-minus" />
                  </button>
                  &nbsp;
                </div>
              </div>

              <div className="card-body">
                <div class="input-group input-group-sm mb-1">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">
                      ชื่อโหมด
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={config_id.config_name}
                    disabled={config_id.config_id === 1 ? true : false}
                    onChange={(e) =>
                      setConfig_id({
                        ...config_id,
                        config_name: e.target.value,
                      })
                    }
                  />
                </div>

                <div class="input-group input-group-sm mb-1">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">
                      Slope Setting
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={config_id.config_slope}
                    disabled={config_id.config_id === 1 ? true : false}
                    onChange={(e) =>
                      setConfig_id({
                        ...config_id,
                        config_slope: e.target.value,
                      })
                    }
                  />
                  {/* <div class="input-group-prepend">
                  <span class="input-group-text text-info" id="inputGroup-sizing-sm">{config_id.config_slope}</span>
                </div> */}
                </div>

                <div class="input-group input-group-sm mb-1">
                  <div class="input-group-prepend ">
                    <span class="input-group-text" id="inputGroup-sizing-sm">
                      Temp Cutoff
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={config_id.config_tempcutoff}
                    disabled={config_id.config_id === 1 ? true : false}
                    onChange={(e) =>
                      setConfig_id({
                        ...config_id,
                        config_tempcutoff: e.target.value,
                      })
                    }
                  />
                  {/* <div class="input-group-prepend">
                  <span class="input-group-text text-info" id="inputGroup-sizing-sm">{config_id.config_tempcutoff}</span>
                </div> */}
                </div>

                <div class="input-group input-group-sm mb-1">
                  <div class="input-group-prepend ">
                    <span class="input-group-text" id="inputGroup-sizing-sm">
                      Temp Leak
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={config_id.config_templeak}
                    disabled={config_id.config_id === 1 ? true : false}
                    onChange={(e) =>
                      setConfig_id({
                        ...config_id,
                        config_templeak: e.target.value,
                      })
                    }
                  />
                  {/* <div class="input-group-prepend">
                  <span class="input-group-text text-info" id="inputGroup-sizing-sm">{config_id.config_templeak}</span>
                </div> */}
                </div>

                <div class="input-group input-group-sm mb-1">
                  <div class="input-group-prepend ">
                    <span class="input-group-text" id="inputGroup-sizing-sm">
                      Time Leak
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={config_id.config_timeleak}
                    disabled={config_id.config_id === 1 ? true : false}
                    onChange={(e) =>
                      setConfig_id({
                        ...config_id,
                        config_timeleak: e.target.value,
                      })
                    }
                  />
                  {/* <div class="input-group-prepend">
                  <span class="input-group-text text-info" id="inputGroup-sizing-sm">{config_id.config_timeleak}</span>
                </div> */}
                </div>

                <div class="input-group input-group-sm mb-1">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">
                      Time No.1 Back
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={config_id.config_time1}
                    disabled={config_id.config_id === 1 ? true : false}
                    onChange={(e) =>
                      setConfig_id({
                        ...config_id,
                        config_time1: e.target.value,
                      })
                    }
                  />
                  {/* <div class="input-group-prepend">
                  <span class="input-group-text text-info" id="inputGroup-sizing-sm">{config_id.config_time1}</span>
                </div> */}
                </div>

                <div class="input-group input-group-sm mb-1">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">
                      Time No.2 Start
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={config_id.config_time2}
                    disabled={config_id.config_id === 1 ? true : false}
                    onChange={(e) =>
                      setConfig_id({
                        ...config_id,
                        config_time2: e.target.value,
                      })
                    }
                  />
                  {/* <div class="input-group-prepend">
                  <span class="input-group-text text-info" id="inputGroup-sizing-sm">{config_id.config_time2}</span>
                </div> */}
                </div>

                <div class="input-group input-group-sm mb-1">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">
                      Time No.3 End
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={config_id.config_time3}
                    disabled={config_id.config_id === 1 ? true : false}
                    onChange={(e) =>
                      setConfig_id({
                        ...config_id,
                        config_time3: e.target.value,
                      })
                    }
                  />
                  {/* <div class="input-group-prepend">
                  <span class="input-group-text text-info" id="inputGroup-sizing-sm">{config_id.config_time3}</span>
                </div> */}
                </div>

                <div class="input-group input-group-sm mb-1">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">
                      Sleep(count Up)
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={config_id.config_sleep}
                    disabled={config_id.config_id === 1 ? true : false}
                    onChange={(e) =>
                      setConfig_id({
                        ...config_id,
                        config_sleep: e.target.value,
                      })
                    }
                  />
                  {/* <div class="input-group-prepend">
                  <span class="input-group-text text-info" id="inputGroup-sizing-sm">{config_id.config_sleep}</span>
                </div> */}
                </div>

                <div class="input-group input-group-sm mb-1">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">
                      Pulse Count(max)
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={config_id.config_pulsecount}
                    disabled={config_id.config_id === 1 ? true : false}
                    onChange={(e) =>
                      setConfig_id({
                        ...config_id,
                        config_pulsecount: e.target.value,
                      })
                    }
                  />
                  <div class="input-group-prepend">
                    <span
                      class="input-group-text text-info"
                      id="inputGroup-sizing-sm"
                    >
                      {pulses}
                    </span>
                  </div>
                </div>
                <div class="input-group input-group-sm">
                  <Slider
                    className="col-12 m-1 mt-2"
                    axis="x"
                    onChange={({ x }) => changePulse(x)}
                    onDragEnd={unpressPulse}
                    x={pulses}
                    xmax={config_id.config_pulsecount}
                    styles={{
                      track: {
                        backgroundColor: "green",
                      },
                      active: {
                        backgroundColor: "green",
                      },
                      disabled: {
                        opacity: 0,
                      },
                    }}
                  />
                </div>
                <br />
                <div class="input-group input-group-sm mb-2">
                  <div class="input-group-prepend" style={{ marginRight: 20 }}>
                    <span class="input-group-text" id="inputGroup-sizing-sm">
                      NIGHT MODE
                    </span>
                  </div>
                  <Switch onChange={handleChangeNight} checked={checkednight} />
                </div>
                <div class="input-group input-group-sm mb-2">
                  <div class="input-group-prepend" style={{ marginRight: 20 }}>
                    <span class="input-group-text" id="inputGroup-sizing-sm">
                      SLEEP MODE
                    </span>
                  </div>
                  <Switch onChange={handleChangeSleep} checked={checkedsleep} />
                </div>
                <div class="input-group input-group-sm mb-1">
                  <div class="input-group-prepend" style={{ marginRight: 20 }}>
                    <span class="input-group-text" id="inputGroup-sizing-sm">
                      ปิด-เปิดไฟ LOGO
                    </span>
                  </div>
                  <Switch onChange={handleChangeLogo} checked={checkedlogo} />
                </div>

                <button
                  type="text"
                  // className="form-control btn btn-secondary"
                  className="form-control btn btn-success mb-2 mt-2"
                  placeholder="setting1"
                  disabled={config_id.config_id === 1 ? true : false}
                  onClick={saveConfig}
                >
                  บันทึก
                </button>
                <button
                  type="text"
                  // className="form-control btn btn-secondary"
                  className="form-control btn btn-danger"
                  placeholder="setting1"
                  disabled={config_id.config_id === 1 ? true : false}
                  onClick={deletemode}
                >
                  ลบโหมด
                </button>
              </div>

              <div className="card-footer bg-transparent"></div>
            </div>
          </div>

          <div className="col-md-11 mx-4 mt-4">
            <div className="card bg-gradient">
              <div
                className="card-header border-0"
                style={{ backgroundColor: "#2F9973" }}
              >
                <h3 className="card-title" style={{ color: "white" }}>
                  <i className="fas fa-table mr-1" />
                  ตั้งค่าโหมดการทำงาน
                </h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-sm"
                    data-card-widget="collapse"
                    style={{ color: "white" }}
                  >
                    <i className="fas fa-minus" />
                  </button>
                  &nbsp;
                </div>
              </div>

              <div className="card-body">
                <div className="row">
                  {config.message
                    ? config.message.map((data, key) => (
                        <div className="col-2 mx-2 mt-2">
                          <button
                            type="text"
                            // className="form-control btn btn-secondary"
                            className={
                              users.message
                                ? users.message[0].user_modes == data.config_id
                                  ? "form-control btn btn-success"
                                  : "form-control btn btn-secondary"
                                : null
                            }
                            placeholder="setting1"
                            onClick={() => handelOnClick(data, key)}
                          >
                            {data.config_name}
                          </button>
                        </div>
                      ))
                    : null}
                  <div className="col-1 mx-2 mt-2">
                    <button
                      type="text"
                      // className="form-control btn btn-secondary"
                      className="form-control btn btn-warning display-1"
                      placeholder="setting1"
                      onClick={addmodes}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-footer bg-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    );
  else return <></>;
}

export default Dartboard;
