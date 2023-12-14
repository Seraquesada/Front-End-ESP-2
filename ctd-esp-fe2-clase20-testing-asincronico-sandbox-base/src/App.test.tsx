import { rest } from "msw";
import App from "./App";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store";

const url = "https://randomuser.me/api/";

const data = {
  results: [
    {
      name: { first: "Steve", last: "Jobs" },

      email: "steve@jobs.com",

      picture: {
        large: "https://randomuser.me/api/portraits/men/68.jpg",
      },
    },
  ],
};

export const handlers = [
  rest.get(url, (req, res, ctx) => {
    return res(ctx.json(data), ctx.status(200));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("App", () => {
  describe("Cuando renderizamos el componente", () => {
    test("No deberia mostrar ningun elemento del usuario", async () => {
      render(
        <Provider store={store}>
          <App />
        </Provider>
      );

      expect(screen.queryByText(/steve jobs/i)).not.toBeInTheDocument();
    });
  });

  describe("Cuando la query se esta ejecutando", () => {
    test("Deberia mostrar el mensaje de cargando", async () => {
      render(
        <Provider store={store}>
          <App />
        </Provider>
      );
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test("No deberia mostrar ningun elemento del usuario", async () => {
      render(
        <Provider store={store}>
          <App />
        </Provider>
      );

      expect(screen.queryByText(/steve jobs/i)).not.toBeInTheDocument();
    });
  });

  describe("Cuando se ejecuta la query con exito", () => {
    beforeEach(() => {
      render(  
        <Provider store={store}>
          <App />
        </Provider>
      );
    });

    test("Ver el nombre del usuario", async () => {
      await waitFor(() => {
        expect(screen.getByText(/steve jobs/i)).toBeInTheDocument();
      });
    });

    test("Ver el email del usuario", async () => {
      const email = await screen.findByText(data.results[0].email);
      expect(email).toBeInTheDocument();
    });

    test("Ver la foto del usuario", async () => {
      const email = await screen.findByAltText(data.results[0].name.first);
      expect(email).toBeInTheDocument();
    });

    test("No deberia mostrar ningun mensaje de cargando", async () => {
      await waitFor(() => {
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
      });
    });
  });

  // describe("Cuando la conexión falla", () => {
  //   server.use(
  //     rest.get(url, (req, res, ctx) => {
  //       return res.networkError("Conexion error");
  //     })
  //   );

  //   test("Debería mostrar mensaje de error", async () => {
  //     const errorMessge = "Error fetching user data";

  //     render(
  //       <Provider store={store}>
  //         <App />
  //       </Provider>
  //     );

  //     await waitFor(() => {
  //       expect(screen.getByText(errorMessge)).toBeInTheDocument();
  //     });
  //   });
  // });
});
