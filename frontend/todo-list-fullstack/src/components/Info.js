import React from 'react'

function Info() {
  return (
    <div>
          <section
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "lavender",
                width:"1000px"
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
    </div>
  )
}

export default Info