import { NavLink } from "react-router"

const NavBar = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-10 rounded-md bg-primary">

      <nav>
        <ul className="flex justify-around py-5 rounded-md text-text font-medium text-base">
          <li>
            <NavLink to="/">
              Página inicial
            </NavLink>
          </li>

          <li>
            <NavLink to="/cadastro-alunos">
              Cadastrar alunos
            </NavLink>
          </li>

          <li>
            <NavLink to="/sobre">
              Sobre
            </NavLink>
          </li>
        </ul>

      </nav >
    </div>

  )
}

export default NavBar