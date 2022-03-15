/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";
import { api } from "../../api";
import Select from "react-dropdown-select";
function Createuser() {
  const history = useHistory();
  const [types, setTypes] = useState([]);
  const [species, setSpecies] = useState([]);
  const [brand, setBrands] = useState([]);

  const [user, setUser] = useState({
    user_username: "",
    user_password: "",
    user_detail: "",
    user_localtion: "",
    user_type: "",
    air_species: "",
    user_purchaseorder: "",
    user_tel: "",
    air_brand: "",
    air_btu: "",
    air_type: "",
    air_lifetime: "",
    user_startwaranty: "",
    user_endwaranty: ""
  });

  const options_typeuser = [
    { value: 'ครัวเรือน', label: 'ครัวเรือน' },
    { value: 'เอกชน', label: 'เอกชน' },
    { value: 'ภาครัฐ', label: 'ภาครัฐ' }
  ]

  async function fetchApiFunc() {
    await axios.get(api + "air/types").then(res => {
      // setTypes(res.data.message);
      var arrayObj = [];
      (res.data.message).map((res1, key1) => {
        arrayObj.push({
          value: res1.airtype_name,
          label: res1.airtype_name
        })
      })
      // arrayObj.push({
      //   value: "อื่นๆ",
      //   label: "อื่นๆ"
      // })
      setTypes(arrayObj);
    });
    await axios.get(api + "air/brands").then(res => {
      // setBrands(res.data.message);
      var arrayObj = [];
      (res.data.message).map((res1, key1) => {
        arrayObj.push({
          value: res1.brand_name,
          label: res1.brand_name
        })
      })
      // arrayObj.push({
      //   value: "อื่นๆ",
      //   label: "อื่นๆ"
      // })
      setBrands(arrayObj);
    });
    await axios.get(api + "air/species").then(res => {
      var arrayObj = [];
      (res.data.message).map((res1) => {
        arrayObj.push({
          value: res1.species_name,
          label: res1.species_name
        })
      })
      // arrayObj.push({
      //   value: "อื่นๆ",
      //   label: "อื่นๆ"
      // })
      setSpecies(arrayObj);
    });
  }

  const swalert = (text) => {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: text,
      showConfirmButton: false,
      timer: 1500
    })
  }

  async function createUser() {
    console.log(user);
    if (!user.user_username) {
      swalert('กรุณากรอกชื่อผู้ใช้');
    } else if (!user.user_password) {
      swalert('กรุณากรอกรหัสผ่าน');
    } else {
      Swal.fire({
        title: "คุณต้องการเพิ่มข้อมูล?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "บันทึก",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(api + "users", {
            user_username: user.user_username,
            user_password: user.user_password,
            user_detail: user.user_detail,
            user_localtion: user.user_localtion,
            user_type: user.user_type,
            air_species: user.air_species,
            user_purchaseorder: user.user_purchaseorder,
            user_tel: user.user_tel,
            air_brand: user.air_brand,
            air_btu: user.air_btu,
            air_type: user.air_type,
            air_lifetime: user.air_lifetime,
            user_startwaranty: user.user_startwaranty,
            user_endwaranty: user.user_endwaranty
          }).then(data => {
            if (!data.data.err) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'เพิ่มข้อมูลสำเร็จ',
                showConfirmButton: false,
                timer: 1000
              })
              setTimeout(() => {
                history.push("/");
              }, 500);
            } else {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'เพิ่มข้อมูลไม่สำเร็จ',
                showConfirmButton: false,
                timer: 1000
              });
            }
          })
        }
      });
    }


  }
  useEffect(() => {
    fetchApiFunc();
  }, []);

  const onSubmit = () => {
    // alert(JSON.stringify(user));
    // console.log(user);
    createUser();

  };

  return (
    <div className="row">
      <div className="col-1"></div>
      <div className="col-10">
        <div className="card  mt-4">
          <div className="card-header" style={{ backgroundColor: "#2F9973" }}>
            <h3
              className="card-title"
              style={{ color: "white" }}
            >
              เพิ่มสมาชิก
            </h3>
          </div>
          <form className="form">
            <div className="card-body">
              
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label
                      htmlFor="inputEmail3"
                      className="col-sm-2 col-form-label"
                    >
                      ชื่อผู้ใช้
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="user_username"
                      placeholder="กรุณากรอกชื่อผู้ใช้"
                      onChange={(e) =>
                        setUser({ ...user, user_username: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                    >
                      รหัสผ่าน
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      id="user_password"
                      placeholder="กรุณากรอกรหัสผ่าน"
                      onChange={(e) =>
                        setUser({ ...user, user_password: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>



              <div className="form-group ">
                <label
                  htmlFor="inputEmail3"
                  className="col-sm-3 col-form-label"
                >
                  รายละเอียดผู้ใช้
                </label>
                <textarea
                  type="area"
                  className="form-control"
                  id="user_detail"
                  placeholder="กรุณากรอกรายละเอียดผู้ใช้"
                  onChange={(e) =>
                    setUser({ ...user, user_detail: e.target.value })
                  }
                />
              </div>

              
              <div className="row">
                <div className="col">
                  {/*  user_localtion  */}
                  <div className="form-group">
                    <label
                      htmlFor="inputEmail3"
                      className="col-sm-4"
                    >
                      สถานที่ติดตั้ง
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="user_localtion"
                      placeholder="กรุณากรอกสถานที่ติดตั้ง"
                      onChange={(e) =>
                        setUser({ ...user, user_localtion: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col">
                  {/*  user_tel  */}
                  <div className="form-group">
                    <label
                      htmlFor="inputEmail3"
                      className="col-sm-4"
                    >
                      เบอร์โทรศัพท์
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="user_tel"
                      placeholder="กรุณากรอกเบอร์โทรศัพท์"
                      onChange={(e) =>
                        setUser({ ...user, user_tel: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/*  user_type  */}
              <div className="form-group">
                <label
                  htmlFor="inputEmail3"
                  className="col-sm-4 col-form-label"
                >
                  ประเภทผู้ใช้
                </label>

                <Select
                  options={options_typeuser}
                  onChange={(e) => setUser({ ...user, user_type: e[0].value })}
                  placeholder="เลือกประเภทผู้ใช้"
                />
              </div>
              <div className="row">

                <div className="col">
                  {/*  user_purchaseorder  */}
                  <div className="form-group">
                    <label
                      htmlFor="inputEmail3"
                      className="col-form-label"
                    >
                      หมายเลขคำสั่งซื้อ
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="user_purchaseorder"
                      placeholder="กรุณากรอกหมายเลขคำสั่งซื้อ"
                      onChange={(e) =>
                        setUser({ ...user, user_purchaseorder: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="col">
                  {/*  วันเริ่มประกัน  */}
                  <div className="form-group">
                    <label
                      htmlFor="inputEmail3"
                      className="col-form-label"
                    >
                      วันเริ่มประกัน
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      id="user_purchaseorder"
                      placeholder="กรุณากรอกวันเริ่มประกัน"
                      onChange={(e) =>
                        setUser({ ...user, user_startwaranty: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="col">
                  {/*  วันหมดประกัน  */}
                  <div className="form-group">
                    <label
                      htmlFor="inputEmail3"
                      className="col-form-label"
                    >
                      วันหมดประกัน
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      id="user_purchaseorder"
                      placeholder="กรุณากรอกวันหมดประกัน"
                      onChange={(e) =>
                        setUser({ ...user, user_endwaranty: e.target.value })
                      }
                    />
                  </div>
                </div>

              </div>

               {/* user_tel 
              <div className="form-group">
                <label
                  htmlFor="inputEmail3"
                  className="col-sm-3 col-form-label"
                >
                  เบอร์โทรศัพท์
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="user_tel"
                  placeholder="กรุณากรอกเบอร์โทรศัพท์"
                  onChange={(e) =>
                    setUser({ ...user, user_tel: e.target.value })
                  }
                />
              </div> */}
              <hr width="100%" align="left/right/center" noshade color="gray" />


              {/*  air_brand  */}
              <div className="form-group">
                <label
                  htmlFor="inputEmail3"
                  className="col-sm-4 col-form-label"
                >
                  ยี่ห้อของแอร์
                </label>

                <Select
                  options={brand}
                  onChange={(e) => setUser({ ...user, air_brand: e[0].value })}
                  placeholder="กรุณาเลือกยี่ห้อของแอร์"
                />
              </div>

              {/*  air_btu  */}
              <div className="form-group">
                <label
                  htmlFor="inputEmail3"
                  className="col-sm-4 col-form-label"
                >
                  ขนาดของแอร์
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="air_btu"
                  placeholder="กรุณากรอกขนาดของแอร์"
                  onChange={(e) =>
                    setUser({ ...user, air_btu: e.target.value })
                  }
                />
              </div>

              {/*  air_type  */}
              <div className="form-group">
                <label
                  htmlFor="inputEmail3"
                  className="col-sm-4 col-form-label"
                >
                  ชนิดของแอร์
                </label>

                <Select
                  options={types}
                  onChange={(e) => setUser({ ...user, air_type: e[0].value })}
                  placeholder="กรุณาเลือกชนิดของแอร์"
                />
              </div>

              {/*  air_species  */}
              <div className="form-group">
                <label
                  htmlFor="inputEmail3"
                  className="col-sm-4 col-form-label"
                >
                  ประเภทของแอร์
                </label>

                <Select
                  options={species}
                  onChange={(e) => setUser({ ...user, air_species: e[0].value })}
                  placeholder="กรุณาเลือกประเภทของแอร์"
                />
              </div>

              {/*  air_lifetime  */}
              <div className="form-group">
                <label
                  htmlFor="inputEmail3"
                  className="col-sm-4 col-form-label"
                >
                  อายุการใช้งานแอร์
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="air_lifetime"
                  placeholder="กรุณากรอกอายุการใช้งานแอร์"
                  onChange={(e) =>
                    setUser({ ...user, air_lifetime: e.target.value })
                  }
                />
              </div>

            </div>




            {/* /.card-body */}
            <div className="card-footer">
              <button
                type="button"
                className="btn "
                style={{ backgroundColor: "#2F9973", color: "white" }}
                onClick={onSubmit}
              >
                Save
              </button>
              <button
                type="button"
                onClick={(e) => {
                  history.push("/");
                  // console.log(user);
                }}
                className="btn btn-default float-right"
              >
                Cancel
              </button>
            </div>
            {/* /.card-footer */}
          </form>
        </div>
      </div>
      <div className="col-3"></div>
    </div>
  );
}

export default Createuser;
