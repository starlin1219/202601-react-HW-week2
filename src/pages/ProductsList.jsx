import { useEffect, useState } from "react";
import axios from "axios";

// API 設定
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function ProductsList() {
  // 產品資料狀態
  const [products, setProducts] = useState([]);
  // 目前選中的產品
  const [tempProduct, setTempProduct] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("hexToken="))
          ?.split("=")[1];

        axios.defaults.headers.common["Authorization"] = token;

        const res = await axios.get(
          `${API_BASE}/api/${API_PATH}/admin/products`
        );
        setProducts(res.data.products);
        // console.log(products);
      } catch (error) {
        alert(error.response?.data.message || "取得產品失敗");
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <h2 className="mb-3">產品列表</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col">查看細節</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">{product.title}</th>
                    <td>{product.origin_price}</td>
                    <td>{product.price}</td>
                    <td>{product.is_enabled ? "啟用" : "未啟用"}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setTempProduct(product)}
                      >
                        查看
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-lg-6">
            <h2 className="mb-3">單一產品細節</h2>
            {tempProduct ? (
              <div className="card">
                <img
                  src={tempProduct.imageUrl}
                  className="card-img-top product-image"
                  alt={tempProduct.title}
                />
                <div className="card-body">
                  <h3 className="card-title">{tempProduct.title}</h3>
                  <p className="card-text">
                    商品描述：{tempProduct.description}
                  </p>
                  <p className="card-text">商品內容：{tempProduct.content}</p>
                  <p className="card-text">
                    商品內容：<del>{tempProduct.origin_price}元</del> /{" "}
                    {tempProduct.price} 元
                  </p>
                  <h4 className="card-title">更多圖片</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {tempProduct.imagesUrl.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        style={{ height: "100px", width: "100px" }}
                        className="card-img-top product-image"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-secondary">請選擇一個商品查看</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
