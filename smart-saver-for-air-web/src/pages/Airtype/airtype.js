import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Swal from "sweetalert2";
import { NavLink, useHistory } from "react-router-dom";
import axios from 'axios';

import { api } from "../../api";
function Airtype() {
    const history = useHistory();
    const [airtype, setAirtype] = useState([]);
    async function fetchType() {
        var arrayObj = [];
        await axios.get(api + "air/types").then(res => {
            (res.data.message).map((res1, key1) => {
                arrayObj.push({
                    id: key1 + 1,
                    airtype_id: res1.airtype_id,
                    airtype_name: res1.airtype_name
                })
            })
        });
        await setAirtype(arrayObj);
    }

    const deleteAirtype = (airtype_id) => {
        axios.delete(api + "air/types/" + airtype_id).then(res => {
            console.log(res.data.err);
            if (res.data.err == false) {
                Swal.fire(
                    'ลบข้อมูล',
                    'ลบข้อมูลสำเร็จ',
                    'success'
                );
                setAirtype(airtype.filter(data => data.airtype_id !== airtype_id));
            } else {
                Swal.fire(
                    'ลบข้อมูล',
                    'ลบข้อมูลไม่สำเร็จ',
                    'error'
                );
            }
        });
    }

    const addAirType = () => {
        Swal.fire({
            title: 'เพิ่มประเภทของแอร์',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'บันทึก',
            cancelButtonText: 'ยกเลิก',
            showLoaderOnConfirm: true,
            preConfirm: (airtype_name) => {
                axios.post(api + "air/types", {
                    airtype_name: airtype_name
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'เพิ่มข้อมูลสำเร็จ',
                    showConfirmButton: false,
                    timer: 1000
                  })
                setTimeout(() => {
                    fetchType();
                }, 500);

            }
        })
    }

    const editAirType = (airtype_id, airtype_name) => {
        Swal.fire({
            title: 'เพิ่มประเภทของแอร์',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            inputValue: airtype_name,
            showCancelButton: true,
            confirmButtonText: 'บันทึก',
            cancelButtonText: 'ยกเลิก',
            showLoaderOnConfirm: true,
            preConfirm: (airtype_name) => {
                axios.put(api + "air/types", {
                    airtype_id: airtype_id,
                    airtype_name: airtype_name
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'แก้ไขข้อมูลสำเร็จ',
                    showConfirmButton: false,
                    timer: 1000
                  })
                setTimeout(() => {
                    fetchType();
                }, 500);
            }
        })
    }
    useEffect(() => {
        fetchType();
    }, []);

    return (
        <div className="card mx-4 mt-4">
            <div className="mt-3 mx-4">
                {/* <NavLink
                    to="/usercreate"
                    exact
                    className="btn mb-2"
                    style={{
                        backgroundColor: "#007E24",
                        color: "white",
                        fontWeight: "bold",
                    }}
                >
                    เพิ่มประเภทของแอร์
                </NavLink> */}
                <div className="btn mb-2"
                    style={{
                        backgroundColor: "#007E24",
                        color: "white",
                        fontWeight: "bold",
                    }}
                    onClick={addAirType}
                >
                    เพิ่มประเภทของแอร์
                </div>
            </div>
            <MaterialTable
                title="ประเภทของแอร์"
                columns={[
                    { title: "ลำดับ", field: "id" },
                    { title: "ประเภท", field: "airtype_name" },
                ]}
                data={airtype}
                actions={[
                    {
                        icon: "edit",
                        iconProps: { fontSize: "medium" },
                        tooltip: "แก้ไขข้อมูล",
                        onClick: (event, rowData) => {
                            // history.push("/useredit/" + rowData.id);
                            console.log(rowData);
                            editAirType(rowData.airtype_id, rowData.airtype_name);
                        },
                    },
                    (rowData) => ({
                        icon: "delete",
                        iconProps: { fontSize: "medium", color: "error" },
                        tooltip: "ลบข้อมูล",
                        onClick: (event, rowData) => {
                            // console.log(rowData.airtype_id);api + "air/types"
                            Swal.fire({
                                title: "คุณต้องการลบข้อมูล?",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Delete!",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    deleteAirtype(rowData.airtype_id);
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

export default Airtype;
