export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold">
        Contact Me
      </h1>

      <form className="mt-10 space-y-6">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
        />

        <textarea
          rows={6}
          placeholder="Your Message"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
        />

        <button
          type="submit"
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}