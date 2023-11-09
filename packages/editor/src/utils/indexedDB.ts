type dbObject = {
    transaction: Function;
    close: Function;
}

/**
         * 打开数据库
         * @param {object} dbName 数据库的名字
         * @param {string} storeName 仓库名称
         * @param {string} version 数据库的版本
         * @return {object} 该函数会返回一个数据库实例
         */
function openDB(dbName: string, version = 1) {
    return new Promise((resolve, reject) => {
        //  兼容浏览器
        var indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB;
        let db;
        // 打开数据库，若没有则会创建
        const request = indexedDB.open(dbName, version);
        // 数据库打开成功回调
        request.onsuccess = function (event) {
            db = event?.target?.result; // 数据库对象
            console.log("数据库打开成功");
            resolve(db);
        };
        // 数据库打开失败的回调
        request.onerror = function (event) {
            console.log("数据库打开报错");
        };
        // 数据库有更新时候的回调
        request.onupgradeneeded = function (event) {
            // 数据库创建或升级的时候会触发
            console.log("onupgradeneeded");
            db = event?.target?.result; // 数据库对象
            var objectStore;
            // 创建存储库
            objectStore = db.createObjectStore("userData", {
                keyPath: "id", // 这是主键
                autoIncrement: true // 实现自增
            });
            // 创建索引，在后面查询数据的时候可以根据索引查
            // objectStore.createIndex("link", "link", { unique: false }); 
            objectStore.createIndex("indexUsername", "username", { unique: false });
            // objectStore.createIndex("messageType", "messageType", {
            //     unique: false,
            // });
        };
    });
}
/**
 * 新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} data 数据
 */
function addData(db: dbObject, storeName: string, data: object) {
    var request = db
        .transaction([storeName], "readwrite") // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
        .objectStore(storeName) // 仓库对象
        .add(data);

    request.onsuccess = function (event) {
        console.log("数据写入成功");
    };

    request.onerror = function (event) {
        console.log("数据写入失败");
    };
}
/**
 * 通过主键读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} key 主键值
 */
function getDataByKey(db: dbObject, storeName: string, key: string | number) {
    return new Promise((resolve, reject) => {
        var transaction = db.transaction([storeName]); // 事务
        var objectStore = transaction.objectStore(storeName); // 仓库对象
        var request = objectStore.get(key); // 通过主键获取数据

        request.onerror = function (event) {
        console.log("事务失败");
        };

        request.onsuccess = function (event) {
        console.log("主键查询结果: ", request.result);
        resolve(request.result);
        };
    });
}
/**
 * 通过游标读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 */
function cursorGetData(db: dbObject, storeName: string) {
    let list = [] as any;
    var store = db
        .transaction(storeName, "readwrite") // 事务
        .objectStore(storeName); // 仓库对象
    var request = store.openCursor(); // 指针对象
    // 游标开启成功，逐行读数据
    request.onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
        // 必须要检查
        list.push(cursor.value);
        cursor.continue(); // 遍历了存储对象中的所有内容
        } else {
        console.log("游标读取的数据：", list);
        }
    };
}
/**
* 通过索引读取数据
* @param {object} db 数据库实例
* @param {string} storeName 仓库名称
* @param {string} indexName 索引名称
* @param {string} indexValue 索引值
*/
function getDataByIndex(db: dbObject, storeName: string, indexName: string, indexValue: string | number) {
    return new Promise((resolve, reject) => {
        var store = db.transaction(storeName, "readwrite").objectStore(storeName);
        var request = store.index(indexName).get(indexValue);
        request.onerror = function () {
            console.log("事务失败");
        };
        request.onsuccess = function (e) {
            var result = e.target.result;
            resolve(result);
            console.log("索引查询结果：", result);
        };
    })
}
/**
* 通过索引和游标查询记录
* @param {object} db 数据库实例
* @param {string} storeName 仓库名称
* @param {string} indexName 索引名称
* @param {string} indexValue 索引值
*/
function cursorGetDataByIndex(db: dbObject, storeName: string, indexName: string, indexValue: string | number) {
let list = [] as any;
var store = db.transaction(storeName, "readwrite").objectStore(storeName); // 仓库对象
var request = store
.index(indexName) // 索引对象
.openCursor(IDBKeyRange.only(indexValue)); // 指针对象
request.onsuccess = function (e) {
var cursor = e.target.result;
if (cursor) {
// 必须要检查
list.push(cursor.value);
cursor.continue(); // 遍历了存储对象中的所有内容
} else {
console.log("游标索引查询结果：", list);
}
};
request.onerror = function (e) {};
}
/**
* 通过索引和游标分页查询记录
* @param {object} db 数据库实例
* @param {string} storeName 仓库名称
* @param {string} indexName 索引名称
* @param {string} indexValue 索引值
* @param {number} page 页码
* @param {number} pageSize 查询条数
*/
function cursorGetDataByIndexAndPage(
db: dbObject,
storeName: string,
indexName: string,
indexValue: string,
page: number,
pageSize: number
) {
let list = [] as any;
let counter = 0; // 计数器
let advanced = true; // 是否跳过多少条查询
var store = db.transaction(storeName, "readwrite").objectStore(storeName); // 仓库对象
var request = store
.index(indexName) // 索引对象
.openCursor(IDBKeyRange.only(indexValue)); // 指针对象
request.onsuccess = function (e) {
var cursor = e.target.result;
if (page > 1 && advanced) {
advanced = false;
cursor.advance((page - 1) * pageSize); // 跳过多少条
return;
}
if (cursor) {
// 必须要检查
list.push(cursor.value);
counter++;
if (counter < pageSize) {
cursor.continue(); // 遍历了存储对象中的所有内容
} else {
cursor = null;
console.log("分页查询结果", list);
}
} else {
console.log("分页查询结果", list);
}
};
request.onerror = function (e) {};
}
/**
* 更新数据
* @param {object} db 数据库实例
* @param {string} storeName 仓库名称
* @param {object} data 数据
*/
function updateDB(db: dbObject, storeName: string, data: object) {
var request = db
.transaction([storeName], "readwrite") // 事务对象
.objectStore(storeName) // 仓库对象
.put(data);

request.onsuccess = function () {
console.log("数据更新成功");
};

request.onerror = function () {
console.log("数据更新失败");
};
}
/**
* 通过主键删除数据
* @param {object} db 数据库实例
* @param {string} storeName 仓库名称
* @param {object} id 主键值
*/
function deleteDB(db: dbObject, storeName: string, id: string | number) {
var request = db
.transaction([storeName], "readwrite")
.objectStore(storeName)
.delete(id);

request.onsuccess = function () {
console.log("数据删除成功");
};

request.onerror = function () {
console.log("数据删除失败");
};
}
/**
* 通过索引和游标删除指定的数据
* @param {object} db 数据库实例
* @param {string} storeName 仓库名称
* @param {string} indexName 索引名
* @param {object} indexValue 索引值
*/
function cursorDelete(db: dbObject, storeName: string, indexName: string, indexValue: string | number) {
var store = db.transaction(storeName, "readwrite").objectStore(storeName);
var request = store
.index(indexName) // 索引对象
.openCursor(IDBKeyRange.only(indexValue)); // 指针对象
request.onsuccess = function (e) {
var cursor = e.target.result;
var deleteRequest;
if (cursor) {
deleteRequest = cursor.delete(); // 请求删除当前项
deleteRequest.onerror = function () {
console.log("游标删除该记录失败");
};
deleteRequest.onsuccess = function () {
console.log("游标删除该记录成功");
};
cursor.continue();
}
};
request.onerror = function (e) {};
}
/**
* 关闭数据库
* @param {object} db 数据库实例
*/
function closeDB(db: dbObject) {
db.close();
console.log("数据库已关闭");
}
/**
* 删除数据库
* @param {object} dbName 数据库名称
*/
function deleteDBAll(dbName: string) {
console.log(dbName);
let deleteRequest = window.indexedDB.deleteDatabase(dbName);
deleteRequest.onerror = function (event) {
console.log("删除失败");
};
deleteRequest.onsuccess = function (event) {
console.log("删除成功");
};
}

export { addData, closeDB, cursorDelete, cursorGetData, cursorGetDataByIndex, cursorGetDataByIndexAndPage, dbObject, deleteDB, deleteDBAll, getDataByIndex, getDataByKey, openDB, updateDB };
