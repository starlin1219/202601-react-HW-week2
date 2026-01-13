import { Link } from "react-router";

export default function AdminHeader() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            Sweetbyte
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse gap-3"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  產品列表
                </Link>
              </li>
            </ul>
            <Link to="/" className="btn btn-outline-primary">
              登入
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
