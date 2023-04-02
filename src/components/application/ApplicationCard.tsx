import { Link } from "react-router-dom";

const ApplicationCard = () => {
  return (
    <Link
      to={`/applications/id`}
      className="h-56 w-full rounded bg-slate-50 p-2 transition duration-200 hover:shadow-md hover:shadow-sky-400">
      <div className="app-card flex h-full flex-col">
        <h3 className="app-card-title">App-Store</h3>
        <p className="app-card-body line-clamp-4 flex-grow pt-2 font-light">
          An application showcase, it&apos;s purpose is to help me navigate
          through which applications I&apos;ve built, what capabilities they
          have, so that I can quickly recall where I used some technique or to
          remind me of what an application was built for.
        </p>
        <div className="app-card-actions flex justify-end py-2">
          <button className="rounded bg-sky-600 px-4 py-2 text-2xl text-white transition-colors duration-300 hover:bg-sky-500">
            Something...
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ApplicationCard;
