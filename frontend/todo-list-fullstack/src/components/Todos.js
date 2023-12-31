import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { MdEditSquare, MdDelete } from "react-icons/md";
import { Input, Modal, Select, Space } from "antd";
import { InputLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import {completedService, deleteOneTodo, updateOneTodo } from "../service";
import { ExclamationCircleFilled } from "@ant-design/icons";
import confirm from "antd/es/modal/confirm";
import { useNavigate } from "react-router-dom";
import addNotification from "react-push-notification";
import DatePicker from "react-datepicker";
import { memo } from "react";
import logo from "../logo.svg";
import '../styles/Todos.css'

function Todos({id,title, text, priorityLevel, dateLast,completed,categoryIdd }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isActive, setIsActive] = React.useState(completed);
  const [overTime, setOverTime] = React.useState();
  const [time, setTime] = React.useState();
  const dateLastTest = new Date(dateLast);

  const refreshDate = () => {
    const dateNowTest = new Date();
    setTime(dateNowTest.getTime());
  };

  React.useEffect(() => {
    let total = dateLastTest.getTime() - time;
    setOverTime(total);

    if (total < 1000 && total > 0) {
      notification(title, text);
    }
  }, [time, dateLastTest]);

  React.useEffect(() => {
    const intervalId = setInterval(refreshDate, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const priotryForStar = () => {
    if (priorityLevel === 1) {
      return <span style={{ opacity: "0.8" }}>⭐⭐⭐</span>;
    } else if (priorityLevel === 2) {
      return <span style={{ opacity: "0.8" }}>⭐⭐</span>;
    } else {
      return <span style={{ opacity: "0.8" }}>⭐</span>;
    }
  };

  //editTodoStart

  const [open, setOpen] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [titlee, setTitlee] = React.useState(title);
  const [textt, setTextt] = React.useState(text);
  const [priorityLevell, setPriorityLevell] = React.useState(priorityLevel);
  const [categoryId, setCategoryId] = React.useState(categoryIdd);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const showModal = () => {
    setOpen(true);
  };
  const handleOkEdit = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch(
        updateOneTodo({
          title: titlee,
          text: textt,
          priorityLevel: priorityLevell,
          date: selectedDate,
          categoryId: categoryId,
          id: id,
        })
      );
      navigate(0);

      setOpen(false);
      setConfirmLoading(false);
      setCategoryId("");
      setTextt("");
      setTitlee("");
      setPriorityLevell("");
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
  };
  const handleChangePriotriy = (value) => {
    setPriorityLevell(value);
  };
  const handleChangeCategories = (value) => {
    setCategoryId(value);
  };

  //editTodoFinish
  const onChange = async (e) => {
    setIsActive(e.target.checked);
    console.log(`checked = ${e.target.checked}`);
    await dispatch(completedService({ completed: e.target.checked, id: id }));
  };
  React.useEffect(()=>{

  },[isActive])

  //delete confirm
  const showDeleteConfirm = () => {
    confirm({
      title: "Uyarı",
      icon: <ExclamationCircleFilled />,
      content: "Todoyu silmek istediğinize emin misiniz ?",
      okText: "Evet",
      okType: "danger",
      cancelText: "Hayır",
      onOk() {
        dispatch(deleteOneTodo(id));
      },
      okCancel() {
        console.log("Vazgeç");
      },
    });
  };
  //delete finish

  const notification = (title, text) => {
    addNotification({
      title: title,
      message: `${title} başlıklı yapılacak iş vakti geldi...`,
      native: true,
      duration: 10000,
      icon: logo,
      onClick: () => console.log(""),
    });
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

  return (
    <main style={{ float: "left", marginRight: "10px" }}>
      <Card 

      className={completed?'active':overTime<0&&"timeOver"}
      sx={{ width: 320, height: 275, marginLeft: 3, marginTop: 5 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <section>
            <input
              style={{ width: "30px", height: "30px", accentColor: "green" }}
              onChange={onChange}
              type="checkbox"
              name="active"
              checked={completed}
            />
          </section>
          <IconButton onClick={showModal}>
            <MdEditSquare />
          </IconButton>
        </div>
        <CardHeader title={title} subheader={toConverFormat(dateLast)} />
        {priotryForStar(priorityLevel)}

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
          <div>
            <IconButton
              onClick={showDeleteConfirm}
              style={
                overTime < 0
                  ? { color: "white", opacity: "0.7" }
                  : { color: "red", opacity: "0.7" }
              }
            >
              <MdDelete />
            </IconButton>
          </div>
        </CardActions>
      </Card>

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
                  value={titlee}
                  onChange={(e) => setTitlee(e.target.value)}
                  placeholder="Başlık Giriniz..."
                  name="title"
                />
              </div>

              <div>
                <InputLabel>
                  <strong>Açıklama</strong>
                </InputLabel>
                <Input
                  value={textt}
                  onChange={(e) => setTextt(e.target.value)}
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
                  value={priorityLevell}
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
                />{" "}
              </div>
            </Space>
          </Modal>
        </>
      </section>
    </main>
  );
}
export default memo(Todos);
