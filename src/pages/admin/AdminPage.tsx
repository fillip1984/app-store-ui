import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { MdAccountBalance, MdOutlineBusiness } from "react-icons/md";
import { TbZoomMoney } from "react-icons/tb";

const url = "http://localhost:7878/wibi/admin";
const username = "admin@wibi.today";
const password = "password";

const AdminPage = () => {
  const exportOptions = [
    {
      label: "Accounts",
      icon: <MdAccountBalance />,
      action: () => handleExport("accounts"),
    },
    {
      label: "Vendors",
      icon: <MdOutlineBusiness />,
      action: () => handleExport("vendors"),
    },
    {
      label: "Budget",
      icon: <TbZoomMoney />,
      action: () => handleExport("budget"),
    },
  ];
  const [importType, setImportType] = useState("");
  const [importFile, setImportFile] = useState<string | Blob | undefined>(
    undefined
  );

  const [exportPretty, setExportPretty] = useState(false);

  const inputFileFieldRef = useRef<HTMLInputElement>(null);

  const handleImportFileUpload = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Uploading imort file now", importFile);
    const data = new FormData();
    if (importFile) {
      data.append("file", importFile);
    }
    data.append("type", importType);

    fetch(`${url}/import`, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
      },
      body: data,
    })
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        if ("success" === text) {
          setImportFile(undefined);
          setImportType("");

          if (inputFileFieldRef.current) {
            // reset field since field with ref. Cannot do using typical means since file inputs cannot be controlled via React
            inputFileFieldRef.current.value = "";
          }
        }
      });
  };

  const handleImportFileAdd = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log("adding import file for upload", e.target.files);
      // See: https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
      setImportFile(e.target.files[0]);
    }
  };

  const handleExport = (exportType: string) => {
    console.log("exporting", exportType);
    let filename = "exported.csv";
    fetch(`${url}/export?type=${exportType}&pretty=${exportPretty}`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    })
      .then((response) => {
        const contentDisposition = response.headers.get("Content-Disposition");
        if (contentDisposition !== null) {
          filename = contentDisposition.split("filename=")[1];
          return response.blob();
        }
      })
      .then((blob) => {
        if (blob) {
          const href = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = href;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      });
  };

  return (
    <div className="container flex flex-col gap-2">
      <h2>Admin Console</h2>
      <div className="card">
        <h3>Import</h3>
        <p>Import accounts, transactions, vendors, etc</p>
        <div className="btn-group mt-2" role="group">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              className="btn-check"
              name="importType"
              id="importAccount"
              autoComplete="off"
              checked={importType === "accounts"}
              onChange={() => setImportType("accounts")}
            />
            <label className="btn btn-outline-primary" htmlFor="importAccount">
              Accounts
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              className="btn-check"
              name="importType"
              id="importVendor"
              autoComplete="off"
              checked={importType === "vendors"}
              onChange={() => setImportType("vendors")}
            />
            <label className="btn btn-outline-primary" htmlFor="importVendor">
              Vendors
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              className="btn-check"
              name="importType"
              id="importBudget"
              autoComplete="off"
              checked={importType === "budget"}
              onChange={() => setImportType("budget")}
            />
            <label className="btn btn-outline-primary" htmlFor="importBudget">
              Budget
            </label>
          </div>
        </div>

        <form onSubmit={handleImportFileUpload}>
          <div className="my-3">
            <input
              className="form-control"
              type="file"
              onChange={handleImportFileAdd}
              accept="application/json"
              ref={inputFileFieldRef}
            />
          </div>

          <button
            type="submit"
            className="rounded bg-slate-400 p-3 text-xl"
            disabled={!importType || !importFile}>
            Upload
          </button>
        </form>
      </div>
      {/* end of imports */}

      <div className="card">
        <h3>Export</h3>
        <p>Exports as json, suitable for importing</p>

        <div className="my-2 flex items-center gap-1">
          <input
            id="exportPretty"
            type="checkbox"
            checked={exportPretty}
            onChange={() => setExportPretty(!exportPretty)}
          />
          <label htmlFor="exportPretty">Export Pretty</label>
        </div>

        <div className="mt-4 flex flex-col items-center justify-center gap-4 md:flex-row">
          {exportOptions.map((exportOption) => (
            <div
              key={exportOption.label}
              id="exportAccounts"
              onClick={exportOption.action}
              className="h-40 w-40 cursor-pointer rounded border-2 border-black">
              <div className="flex h-full w-full flex-col items-center justify-center p-2">
                <h3>{exportOption.label}</h3>
                <span className="text-2xl">{exportOption.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* end of exports */}
    </div>
  );
};

export default AdminPage;
