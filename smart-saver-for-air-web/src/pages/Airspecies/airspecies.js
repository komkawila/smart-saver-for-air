import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Swal from "sweetalert2";
import { NavLink, useHistory } from "react-router-dom";
import axios from 'axios';

import { api } from "../../api";
function Airspecies() {
    const history = useHistory();
    const [airspecies, setAirspecies] = useState([]);
    async function fetchSpecies() {
        var arrayObj = [];
        await axios.get(api + "air/species").then(res => {
            (res.data.message).map((res1, key1) => {
                arrayObj.push({
                    id: key1 + 1,
                    species_id: res1.species_id,
                    species_name: res1.species_name
                })
            })
        });
        await setAirspecies(arrayObj);
        await console.log(arrayObj);
    }

    const deleteAirspecies = (species_id) => {
        axios.delete(api + "air/species/" + species_id).then(res => {
            console.log(res.data.err);
            if (res.data.err == false) {
                Swal.fire(
                    'ลบข้อมูล',
                    'ลบข้อมูลสำเร็จ',
                    'success'
                );
                setAirspecies(airspecies.filter(data => data.species_id !== species_id));
            } else {
                Swal.fire(
                    'ลบข้อมูล',
                    'ลบข้อมูลไม่สำเร็จ',
                    'error'
                );
            }
        });
    }

    const addAirSpecies = () => {
        Swal.fire({
            title: 'เพิ่มชนิดของแอร์',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'บันทึก',
            cancelButtonText: 'ยกเลิก',
            showLoaderOnConfirm: true,
            preConfirm: (species_name) => {
                axios.post(api + "air/species", {
                    species_name: species_name
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
                    fetchSpecies();
                }, 500);

            }
        })
    }

    const editAirSpecies = (species_id, species_name) => {
        Swal.fire({
            title: 'เพิ่มชนิดของแอร์',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            inputValue: species_name,
            showCancelButton: true,
            confirmButtonText: 'บันทึก',
            cancelButtonText: 'ยกเลิก',
            showLoaderOnConfirm: true,
            preConfirm: (species_name) => {
                axios.put(api + "air/species", {
                    species_id: species_id,
                    species_name: species_name
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
                    fetchSpecies();
                }, 500);
            }
        })
    }
    useEffect(() => {
        fetchSpecies();
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
                    เพิ่มชนิดของแอร์
                </NavLink> */}
                <div className="btn mb-2"
                    style={{
                        backgroundColor: "#007E24",
                        color: "white",
                        fontWeight: "bold",
                    }}
                    onClick={addAirSpecies}
                >
                    เพิ่มชนิดของแอร์
                </div>
            </div>
            <MaterialTable
                title="ชนิดของแอร์"
                columns={[
                    { title: "ลำดับ", field: "id" },
                    { title: "ชนิด", field: "species_name" },
                ]}
                data={airspecies}
                actions={[
                    {
                        icon: "edit",
                        iconProps: { fontSize: "medium" },
                        tooltip: "แก้ไขข้อมูล",
                        onClick: (event, rowData) => {
                            // history.push("/useredit/" + rowData.id);
                            console.log(rowData);
                            editAirSpecies(rowData.species_id, rowData.species_name);
                        },
                    },
                    (rowData) => ({
                        icon: "delete",
                        iconProps: { fontSize: "medium", color: "error" },
                        tooltip: "ลบข้อมูล",
                        onClick: (event, rowData) => {
                            // console.log(rowData.species_id);api + "air/types"
                            Swal.fire({
                                title: "คุณต้องการลบข้อมูล?",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Delete!",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    deleteAirspecies(rowData.species_id);
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

export default Airspecies;
