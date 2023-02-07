import React, { useState, useEffect } from "react";
import "./App.css";
import Draggable from "react-draggable";
// React, useState, useEffectをインポート。React Hooksを利用するときの関数。
//Draggableというライブラリをインポート。ドラッグ＆ドロップが可能となる。

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const newitem = () => {
    if (item.trim() !== "") {
      const newitem = {
        id: Date.now(),
        item: item,
        color: "rgba(255, 255, 255, 0.5)",
        defaultPos: { x: 100, y: 0 },
      };
      setItems((items) => [...items, newitem]);
      setItem("");
    } else {
      alert("何も入力されていません");
      setItem("");
    }
  };

  const keyDown = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      newitem();
    }
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const updatePos = (data, index) => {
    let newArr = [...items];
    newArr[index].defaultPos = { x: data.x, y: data.y };
    setItems(newArr);
  };

  const deleteNote = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <div id="new-item">
        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Enter something..."
          onKeyDown={keyDown}
        />
        <button onClick={newitem}>ENTER</button>
      </div>
      <div id="items">
        {items.map((item, index) => {
          return (
            <Draggable
              key={item.id}
              defaultPosition={item.defaultPos}
              onStop={(e, data) => {
                updatePos(data, index);
              }}
            >
              <div style={{ backgroundColor: item.color }} className="box">
                <p style={{ margin: 0 }}>{item.item}</p>
                <button id="delete" onClick={(e) => deleteNote(item.id)}>
                  X
                </button>
              </div>
            </Draggable>
          );
        })}
      </div>
    </div>
  );
}

export default App;

//メモ
//newitem関数は、入力されたテキストをitems配列に追加するための関数。
//入力されたテキストが空白でない場合にのみ、新しいノートを作成になる。

//keyPress関数は、Enterキーが押された時にnewitem関数を呼び出すための関数。

//useEffect関数は、状態変数のitemsが変更された時に、localStorageに値を保存するために使用できる。

//updatePos関数は、Draggableライブラリを使ってノートが移動した時に呼び出される。
//この関数は、移動したノートの位置を更新するために使用できる。

//deleteNote関数は、特定のノートを削除するための関数。
//この関数は、特定のノートを削除ボタンが押された時に呼び出される。

//return文で、アプリケーションのレンダリングを行う。