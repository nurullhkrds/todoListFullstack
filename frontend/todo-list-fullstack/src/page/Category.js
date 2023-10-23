import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllTodosCategory } from '../service';
import Todos from '../components/Todos';
import Categories from "./Categories";
import {
  addOneTodo,
  dateasc,
  datedesc,
  filterDate,
  filterDateAndPriotry,
  filterPriotry,
  getAllTodosUserId,
  sortingPriotry,
} from "../service";
import {  IconButton, InputLabel } from "@mui/material";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal, Space, Input, Select } from "antd";
import { MdFilterAlt, MdSort } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { completedAll, noCompleted } from "../redux/slice/todoSlice";
import '../styles/Home.css'


function Category() {
  const {categoryIdd}=useParams();
  const dispatch = useDispatch();
  const todosAll = useSelector((state) => state.category.categoryTodosAll);
  const todosAllStatus = useSelector((state) => state.category.categoryTodosStatus);
    
  useEffect(()=>{
    if(todosAllStatus==="idle"){
        getAllTodos();
    }
        
       
    
    

  },[todosAllStatus,todosAll])
  console.log(todosAll);
  const getAllTodos=async()=>{
    await dispatch(getAllTodosCategory(categoryIdd))

  }
  const navigate=useNavigate()
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

 
  useEffect(() => {
    if (todosAllStatus === "idle") {
      getTodos();
    }
  },[todosAll,todosAllStatus]);

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
  const [filteredDate, SetfilteredDate] = useState();
  const [filteredDateToSend, SetfilteredDateToSend] = useState();


  const handleOkFiltered = () => {
    setConfirmLoadingFiltered(true);
 

    setTimeout(() => {
     
      
      if(filteredDate){
        if(priorityLevell){
          dispatch(filterDateAndPriotry({dueDate:filteredDateToSend,priority:priorityLevell}))

        }
        else{
          dispatch(filterDate(filteredDateToSend))

        }
        
      }
      else{
        dispatch(filterPriotry(priorityLevell))
      }
     
     
      
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
   const datee=toConverFormat(date)
   SetfilteredDateToSend(datee)
   SetfilteredDate(date);
    console.log(typeof(datee));
  };

  //helper
  function toConverFormat(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

const handleCompletedAll=()=>{
  dispatch(completedAll())
 

}


 
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
          <section style={{ marginLeft: "80px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
           
              <section
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "lavender",
                }}
              >
                <div style={{ marginRight: "20px" }}>
                  <p>Çok Önemli</p>⭐⭐⭐
                </div>
                <div style={{ marginRight: "20px" }}>
                  <p>Önemli</p>⭐⭐
                </div>
                <div style={{ marginRight: "20px" }}>
                  <p>Az Önemli</p>⭐
                </div>
                <div
                  style={{
                    marginRight: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      border: "1px solid",
                      width: "10px",
                      height: "10px",
                      background: "green",
                    }}
                  ></div>
                   Tamamlanan
                </div>
                <div
                  style={{
                    marginRight: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      border: "1px solid",
                      width: "10px",
                      height: "10px",
                      background: "red ",
                    }}
                  ></div>
                  Zamanı Geçen
                </div>
              </section>
              <section style={{ marginLeft: "20px", marginTop: "40px" }}>
                <IconButton onClick={showModalSorting}>
                  <MdSort />
                </IconButton>
                <IconButton onClick={showModalFiltered}>
                  <MdFilterAlt />
                </IconButton>
                <Button onClick={()=>handleCompletedAll()}>
                  Tamamlanmış
                </Button>
                <Button onClick={() => dispatch(noCompleted())}>
                  Tamamlanmamış
                </Button>
              </section>

              <section className="listTodo" style={{background:"gray",border:"1px solid",width:"1100px",height:"500px",overflow:"auto"}}>
            {todosAll.map((todo, key) => {
              return <Todos id={todo.id} categoryIdd={todo.categoryId} title={todo.title} text={todo.text} priorityLevel={todo.priorityLevel} dateLast={todo.dateLast} completed={todo.completed} key={key} />;
            })}

            </section>
         
          </section>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
            marginLeft: "600px",
          }}
        >
          <Link style={{ textDecoration: "none" }} to={"/login"}>
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
                      value:null,
                      label:"none"
                    }
                    ,
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
              <div style={{marginTop:"15px"}}>
              <InputLabel>
                  <strong>Tarih</strong>
                </InputLabel>

                <Space direction="vertical">
                  <DatePicker 
                  selected={filteredDate}
                  onChange={handleFilteredDate}
                  />
                </Space>
              </div>
            </section>
          </Space>
        </Modal>
      </>
    </main>
  )
}

export default Category