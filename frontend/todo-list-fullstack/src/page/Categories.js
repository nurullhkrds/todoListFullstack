import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories, getAllTodosCategory } from "../service";
import { Link } from "react-router-dom";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { MdPersonPin, MdGroupWork } from "react-icons/md";
import "../styles/Categories.css";
function Categories() {
  const dispatch = useDispatch();
  const categoriesAll = useSelector((state) => state.category.categoriesAll);
  const categoriesAllStatus = useSelector(
    (state) => state.category.categoriesAllStatus
  );

  useEffect(() => {
    if (categoriesAllStatus === "idle") {
      getCategory();
    }
  }, [categoriesAllStatus, categoriesAll]);

  const getCategory = async () => {
    await dispatch(getAllCategories());
  };

  const getNameCategories=(id)=>{
    if(id===1){
      return "KİŞİSEL"
    }
    else if(id===2){
      return "ALIŞVERİŞ"
    }
    else{
      return "İŞ"
    }

  }

  const categoryIcon = (category) => {
    if (category === 1) {
      return <MdPersonPin style={{ width: "30px", height: "30px" }} />;
    } else if (category === 2) {
      return <LiaShoppingBagSolid style={{ width: "30px", height: "30px" }} />;
    } else {
      return <MdGroupWork style={{ width: "30px", height: "30px" }} />;
    }
  };
  const handleFiltredCategories=async(id)=>{
    await dispatch(getAllTodosCategory(id))
  
    
    
  }
  return (
    <main style={{ marginTop: "25px", marginLeft: "15px"}}>
    
      {categoriesAll.map((category, key) => {
        return (
          <Link  onClick={()=>handleFiltredCategories(category.id)} style={{  textDecoration: "none" ,color:"rgb(25,118,210)"}}>
            <div
            className="categoriesLink"
              style={{ border: "1px solid", height: "100px" ,borderRadius:"15px  "}}
              key={category.id}
            >
              <section>{categoryIcon(category.id)}</section>
              <p>{getNameCategories(category.id)}</p>
            </div>
          </Link>
        );
      })}
    </main>
  );
}

export default Categories;
