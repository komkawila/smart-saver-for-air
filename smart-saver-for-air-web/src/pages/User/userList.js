import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Swal from "sweetalert2";
import { NavLink, useHistory } from "react-router-dom";
import axios from 'axios';
import { api } from "../../api";

function Listuser() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  async function fetchType() {
    var arrayObj = [];
    await axios.get(api + "users").then(res => {
      (res.data.message).map((res1, key1) => {
      // console.log(res1);
        arrayObj.push({
          id: key1 + 1,
          user_id: res1.user_id,
          user_username: res1.user_username,
          user_password: res1.user_password,
          user_detail: res1.user_detail,
          user_localtion: res1.user_localtion,
          user_type: res1.user_type,
          user_purchaseorder: res1.user_purchaseorder,
          user_tel: res1.user_tel,
          user_updatetimes: res1.user_updatetimes,
          user_createtimes: res1.user_createtimes,
          air_brand: res1.air_brand,
          air_btu: res1.air_btu,
          air_type: res1.air_type,
          air_lifetime: res1.air_lifetime
        })
      })
    });
    await setUsers(arrayObj);
  }

  const deleteUser = (user_id) => {
    axios.delete(api + "users/" + user_id).then(res => {
        console.log(res.data.err);
        if (res.data.err == false) {
            Swal.fire(
                'ลบข้อมูล',
                'ลบข้อมูลสำเร็จ',
                'success'
            );
            setUsers(users.filter(data => data.user_id !== user_id));
        } else {
            Swal.fire(
                'ลบข้อมูล',
                'ลบข้อมูลไม่สำเร็จ',
                'error'
            );
        }
    });
}

  useEffect(() => {
    fetchType();
  }, []);

  return (
    <div className="card mx-4 mt-4">
      <div className="mt-3 mx-4">
        <NavLink
          to="/usercreate"
          exact
          className="btn mb-2"
          style={{
            backgroundColor: "#007E24",
            color: "white",
            fontWeight: "bold",
          }}
        >
          เพิ่มสมาชิก
        </NavLink>
      </div>
      <MaterialTable
        title="ข้อมูลสมาชิก"
        columns={[
          { title: "ลำดับ", field: "id"},
          { title: "หมายเลขคำสั่งซื้อ", field: "user_purchaseorder" },
          { title: "ชื่อผู้ใช้", field: "user_username" },
          { title: "รหัสผ่าน", field: "user_password" },
          { title: "ข้อมูลผู้ใช้", field: "user_detail" },
          { title: "สถานที่ติดตั้ง", field: "user_localtion" },
        ]}
        data={users}
        actions={[
          {
              icon: "settings",
              iconProps: { fontSize: "medium" },
              tooltip: "ตั้งค่าอุปกรณ์",
              onClick: (event, rowData) => {
                  // history.push("/dashboard/" + rowData.user_id,{
                    
                  // });
                  history.push("/dashboard",{
                    id : rowData.user_id
                  });
                  console.log(rowData);
                  // editAirType(rowData.user_id, rowData.airtype_name);
              },
          },
          {
              icon: "edit",
              iconProps: { fontSize: "medium" },
              tooltip: "ดูข้อมูล / แก้ไขข้อมูล",
              onClick: (event, rowData) => {
                  history.push("/useredit/" +rowData.user_id,{                    
                  });
                  console.log(rowData);
                  // editAirType(rowData.user_id, rowData.airtype_name);
              },
          },
          () => ({
              icon: "delete",
              iconProps: { fontSize: "medium", color: "error" },
              tooltip: "ลบข้อมูล",
              onClick: (event, rowData) => {
                  Swal.fire({
                      title: "คุณต้องการลบข้อมูล?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Delete!",
                  }).then((result) => {
                      if (result.isConfirmed) {
                          deleteUser(rowData.user_id);
                      }
                  });
              },
          }),
      ]}
        options={{
          actionsColumnIndex: -1,
          exportButton: true,
          headerStyle: {
            backgroundColor: "#2F9973",
            color: "#FFF",
          },
        }}
      />
    </div>
  );
}

export default Listuser;
