import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import { useSelector, useDispatch } from "react-redux";
import Todos from "../components/Todos";
import {
  addOneTodo,
  dateasc,
  datedesc,
  filterPriotry,
  getAllTodosUserId,
  sortingPriotry,
} from "../service";
import { FormControl, IconButton, InputLabel, MenuItem } from "@mui/material";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal, Space, Input, Select } from "antd";
import { MdFilterAlt, MdSort } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { completedAll, noCompleted } from "../redux/slice/todoSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Home() {
  //add modal start
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [priorityLevel, setPriorityLevel] = useState();
  const [categoryId, setCategoryId] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showModal = () => {
    setOpen(true);
  };
  const handleOkEdit = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch(
        addOneTodo({
          title: title,
          text: text,
          priorityLevel: priorityLevel,
          date: selectedDate,
          userId: parseInt(localStorage.getItem("currentUserId")),
          categoryId: categoryId,
        })
      );
      setOpen(false);
      setConfirmLoading(false);
      setCategoryId("");
      setText("");
      setTitle("");
      setPriorityLevel("");
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleChangePriotriy = (value) => {
    setPriorityLevel(value);
  };
  const handleChangeCategories = (value) => {
    setCategoryId(value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
  };
  //add modaFinish

  const dispatch = useDispatch();
  const todosAll = useSelector((state) => state.todo.todosAll);
  const todosAllStatus = useSelector((state) => state.todo.todosAllStatus);
  useEffect(() => {
    if (todosAllStatus === "idle") {
      getTodos();
    }
  });

  const getTodos = async () => {
    await dispatch(getAllTodosUserId());
  };

  const handleGetAll = async () => {
    await dispatch(getAllTodosUserId());
  };

  //sorting
  const [openSorting, setOpenSorting] = React.useState(false);
  const [confirmLoadingSorting, setConfirmLoadingSorting] =
    React.useState(false);

  const handleOkSorting = () => {
    setConfirmLoadingSorting(true);
    setTimeout(() => {
      setOpenSorting(false);
      setConfirmLoadingSorting(false);
    }, 2000);
  };
  const handleCancelSorting = () => {
    setOpenSorting(false);
  };

  const showModalSorting = () => {
    setOpenSorting(true);
  };
  //filtered
  const [openFiltered, setOpenFiltered] = React.useState(false);
  const [confirmLoadingFiltered, setConfirmLoadingFiltered] =
    React.useState(false);
  const [priorityLevell, setPriorityLevell] = React.useState();
  const [filteredDate, SetfilteredDate] = useState(new Date());

  const handleOkFiltered = () => {
    setConfirmLoadingFiltered(true);
    setTimeout(() => {
      dispatch(filterPriotry(priorityLevell));
      setOpenFiltered(false);
      setConfirmLoadingFiltered(false);
    }, 2000);
  };
  const handleCancelFiltered = () => {
    setOpenFiltered(false);
  };

  const showModalFiltered = () => {
    setOpenFiltered(true);
  };

  const handleFiltred = (value) => {
    setPriorityLevell(value);
  };
  const handleFilteredDate = (date) => {
    SetfilteredDate(date);
    console.log(date);
  };

  return (
    <main style={{ display: "flex", justifyContent: "flex-start" }}>
      {localStorage.getItem("token") ? (
        <>
          <section>
            <IconButton onClick={showModal} style={{ marginLeft: "15px" }}>
              {" "}
              <BsFillFileEarmarkPlusFill
                style={{ width: "80px", height: "80px" }}
              />
            </IconButton>

            <Button
              onClick={() => handleGetAll()}
              style={{
                marginTop: "15px",
                border: "1px solid",
                width: "100px",
                height: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "15px",
                borderRadius: "4px  ",
              }}
            >
              Tümü
            </Button>

            <Categories />
          </section>
          <section style={{ marginLeft: "180px" }}>
            <div>
              <section style={{display:"flex",justifyContent:"center",alignItems:"center",background:"lavender"}}>
                <div style={{marginRight:"10px"}}><p>Çok Önemli</p><FaStar/><FaStar/><FaStar/></div>
                <div style={{marginRight:"10px"}}><p>Önemli</p><FaStar/><FaStar/></div>
                <div style={{marginRight:"10px"}}><p>Az Önemli</p><FaStar/></div>
                <div style={{marginRight:"10px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}><div style={{border:"1px solid",width:"10px",height:"10px",background:"green"}}></div>Zamanında Tamamlanan</div>
                <div style={{marginRight:"10px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}><div style={{border:"1px solid",width:"10px",height:"10px",background:"red "}}></div>Zamanı Geçen</div>

              </section>
              <section style={{ marginLeft: "20px",marginTop:"40px" }}>
                
                <IconButton onClick={showModalSorting}>
                  <MdSort />
                </IconButton>
                <IconButton onClick={showModalFiltered}>
                  <MdFilterAlt />
                </IconButton>
                <Button onClick={()=>dispatch(completedAll())}>Tamamlanmış</Button>
               <Button onClick={()=>dispatch(noCompleted())}>Tamamlanmamış</Button>

              </section>
            </div>
            {todosAll.map((todo, key) => {
              return <Todos key={key} todo={todo} />;
            })}
          </section>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop:"50px",
            marginLeft:"600px",
            
            
          }}
        >
          <Link style={{textDecoration:"none"}} to={"/login"}>
            <p>Giriş yapmak için tıklayınız...</p>
          </Link>
        </div>
      )}

      <section>
        <>
          <Modal
            title="To Do ?"
            open={open}
            onOk={handleOkEdit}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <Space
              style={{
                width: "100%",
                marginTop: "5px",
                marginBottom: "5px",
              }}
              direction="vertical"
            >
              <div>
                <InputLabel>
                  <strong>Kategori</strong>
                </InputLabel>

                <Select
                  placeholder="Kategori Seçiniz..."
                  style={{
                    width: "100%",
                  }}
                  value={categoryId}
                  onChange={handleChangeCategories}
                  options={[
                    {
                      value: 1,
                      label: "Kişisel",
                    },
                    {
                      value: 2,
                      label: "Alışveriş",
                    },
                    {
                      value: 3,
                      label: "İş",
                    },
                  ]}
                />
              </div>
              <div>
                <InputLabel>
                  <strong>Başlık</strong>
                </InputLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Başlık Giriniz..."
                  name="title"
                />
              </div>

              <div>
                <InputLabel>
                  <strong>Açıklama</strong>
                </InputLabel>
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Açıklama giriniz..."
                  name="text"
                />
              </div>

              <div>
                <InputLabel>
                  <strong>Öncelik Sırası</strong>
                </InputLabel>

                <Select
                  placeholder="Öncelik sırası giriniz (1.Çok Önemli, 2.Önemli, 3.Az Önemli)"
                  style={{
                    width: "100%",
                  }}
                  value={priorityLevel}
                  onChange={handleChangePriotriy}
                  options={[
                    {
                      value: 1,
                      label: 1,
                    },
                    {
                      value: 2,
                      label: 2,
                    },
                    {
                      value: 3,
                      label: 3,
                    },
                  ]}
                />
              </div>

              <div>
                <InputLabel>
                  <strong>Tarih</strong>
                </InputLabel>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Saat"
                  dateFormat="dd/MM/yyyy h:mm aa"
                />
              </div>
            </Space>
          </Modal>
        </>
      </section>
      <>
        <Modal
          title="Sırala"
          open={openSorting}
          onOk={handleOkSorting}
          confirmLoading={confirmLoadingSorting}
          onCancel={handleCancelSorting}
        >
          <Space
            style={{
              width: "400px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
            direction="vertical"
          >
            <section
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button onClick={() => dispatch(sortingPriotry())}>
                Önceliğe göre sırala...
              </Button>
              <Button onClick={() => dispatch(dateasc())}>
                En Eskiye göre sırala
              </Button>
              <Button onClick={() => dispatch(datedesc())}>
                En yeniye göre sırala
              </Button>
            </section>
          </Space>
        </Modal>
      </>
      <>
        <Modal
          title="Filtrele"
          open={openFiltered}
          onOk={handleOkFiltered}
          confirmLoading={confirmLoadingFiltered}
          onCancel={handleCancelFiltered}
        >
          <Space
            style={{
              width: "400px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
            direction="vertical"
          >
            <section style={{}}>
              <div>
                <InputLabel>
                  <strong>Öncelik Sırası</strong>
                </InputLabel>

                <Select
                  placeholder="Öncelik sırası giriniz (1.Çok Önemli, 2.Önemli, 3.Az Önemli)"
                  style={{
                    width: "100%",
                  }}
                  value={priorityLevell}
                  onChange={handleFiltred}
                  options={[
                    {
                      value: 1,
                      label: 1,
                    },
                    {
                      value: 2,
                      label: 2,
                    },
                    {
                      value: 3,
                      label: 3,
                    },
                  ]}
                />
              </div>
              <div></div>
            </section>
          </Space>
        </Modal>
      </>
    </main>
  );
}

export default Home;
