import { useDispatch, useSelector } from "react-redux";
import { themes } from "../../constants/theme";
import { RootState } from "../../lib/redux/store";
import { setTheme } from "../../lib/redux/slices/themeSlice";
import { IoSend } from "react-icons/io5";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey ! what's app bro", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on new project.",
    isSent: true,
  },
];

const Settings = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  return (
    <div className="h-screen container mx-auto px-4 sm:px-20 py-4  overflow-auto">
      <div className="flex flex-col sm:flex-row w-full gap-8">
        <div className="space-y-6 w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">Theme</h2>
            <p className="text-sm text-base-content/70">
              Choose a theme for your chat interface
            </p>
          </div>

          <div className="grid grid-cols-4  gap-2">
            {themes.map((t) => (
              <button
                key={t}
                className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
              `}
                onClick={() => dispatch(setTheme(t))}
              >
                <div
                  className="relative h-8 w-full rounded-md overflow-hidden"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-[11px] font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full h-full">
          <h3 className="text-lg font-semibold mb-3">Preview</h3>
          <div className="rounded-xl">
            <div className="p-4">
              <div className="max-w-lg mx-auto">
                {/* Mock Chat UI */}
                <div className="bg-base-100 rounded-lg shadow-sm overflow-hidden">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-base-300 bg-base-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                        S
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Suresh K</h3>
                        <p className="text-xs text-base-content/70">Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isSent ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${
                            message.isSent
                              ? "bg-primary text-primary-content"
                              : "bg-base-200"
                          }
                        `}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`
                            text-[10px] mt-1.5
                            ${
                              message.isSent
                                ? "text-primary-content/70"
                                : "text-base-content/70"
                            }
                          `}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-base-300 bg-base-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input text-sm input-md"
                        placeholder="Type a message..."
                        readOnly
                      />
                      <button className="btn btn-primary h-9 min-h-0">
                        <IoSend size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
