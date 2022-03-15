import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Swal from "sweetalert2";
import { NavLink, useHistory } from "react-router-dom";
import axios from 'axios';

import { api } from "../../api";
function Airbrand() {
    const history = useHistory();
    const [Airbrand, setAirbrand] = useState([]);
    async function fetchType() {
        var arrayObj = [];
        await axios.get(api + "air/brands").then(res => {
            (res.data.message).map((res1, key1) => {
                arrayObj.push({
                    id: key1 + 1,
                    brand_id: res1.brand_id,
                    brand_name: res1.brand_name
                })
            })
        });
        await setAirbrand(arrayObj);
    }

    const deleteAirbrand = (brand_id) => {
        axios.delete(api + "air/brands/" + brand_id).then(res => {
            console.log(res.data.err);
            if (res.data.err == false) {
                Swal.fire(
                    'ลบข้อมูล',
                    'ลบข้อมูลสำเร็จ',
                    'success'
                );
                setAirbrand(Airbrand.filter(data => data.brand_id !== brand_id));
            } else {
                Swal.fire(
                    'ลบข้อมูล',
                    'ลบข้อมูลไม่สำเร็จ',
                    'error'
                );
            }
        });
    }

    const addAirbrand = () => {
        Swal.fire({
            title: 'เพิ่มยี่ห้อของแอร์',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'บันทึก',
            cancelButtonText: 'ยกเลิก',
            showLoaderOnConfirm: true,
            preConfirm: (brand_name) => {
                axios.post(api + "air/brands", {
                    brand_name: brand_name
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

    const editAirbrand = (brand_id, brand_name) => {
        Swal.fire({
            title: 'เพิ่มยี่ห้อของแอร์',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            inputValue: brand_name,
            showCancelButton: true,
            confirmButtonText: 'บันทึก',
            cancelButtonText: 'ยกเลิก',
            showLoaderOnConfirm: true,
            preConfirm: (brand_name) => {
                axios.put(api + "air/brands", {
                    brand_id: brand_id,
                    brand_name: brand_name
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
                    เพิ่มยี่ห้อของแอร์
                </NavLink> */}
                <div className="btn mb-2"
                    style={{
                        backgroundColor: "#007E24",
                        color: "white",
                        fontWeight: "bold",
                    }}
                    onClick={addAirbrand}
                >
                    เพิ่มยี่ห้อของแอร์
                </div>
            </div>
            <MaterialTable
                title="ยี่ห้อของแอร์"
                columns={[
                    { title: "ลำดับ", field: "id" },
                    { title: "ยี่ห้อ", field: "brand_name" },
                ]}
                data={Airbrand}
                actions={[
                    {
                        icon: "edit",
                        iconProps: { fontSize: "medium" },
                        tooltip: "แก้ไขข้อมูล",
                        onClick: (event, rowData) => {
                            // history.push("/useredit/" + rowData.id);
                            console.log(rowData);
                            editAirbrand(rowData.brand_id, rowData.brand_name);
                        },
                    },
                    (rowData) => ({
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
                                    deleteAirbrand(rowData.brand_id);
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

export default Airbrand;
