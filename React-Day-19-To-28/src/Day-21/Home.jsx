import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Todo from "./todo/Todo";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <main className="flex-1">
        <Todo />
      </main>

      <Footer />
    </div>
  );
}

export default Home;