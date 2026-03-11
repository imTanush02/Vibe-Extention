import React, { useState, useEffect } from "react";
import { storage } from "../../engine/storage";
import { Plus, Trash2, Check } from "lucide-react";

const TodoWidget = () => {
  const [todos, setTodos] = useState(() =>
    storage.get("widget_todos", [
      { id: 1, text: "Welcome to VibeOS", completed: false },
      { id: 2, text: "Drag me anywhere!", completed: true },
    ]),
  );

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    storage.set("widget_todos", todos);
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTodo = { id: Date.now(), text: inputValue, completed: false };
    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Outer div has NO styling now, pure structural
  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h4
          style={{ color: "var(--vibe-accent)" }}
          className="font-bold text-sm uppercase tracking-wider flex items-center gap-2"
        >
          Tasks
          <span className="bg-white/10 text-white/60 text-[10px] px-1.5 py-0.5 rounded-full">
            {todos.filter((t) => !t.completed).length}
          </span>
        </h4>
      </div>

      {/* Input */}
      <form onSubmit={handleAddTodo} className="relative mb-3 group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="New task..."
          className="w-full bg-white/5 border border-white/10 rounded-lg py-1.5 pl-2 pr-8 text-sm text-white placeholder-white/30 focus:outline-none focus:bg-white/10 transition-colors"
          style={{ caretColor: "var(--vibe-accent)" }}
        />
        <button
          type="submit"
          className="absolute right-1 top-1 p-1 rounded-md text-white/50 hover:text-[var(--vibe-accent)] hover:bg-white/10 transition-all"
        >
          <Plus size={16} />
        </button>
      </form>

      {/* List */}
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-1.5">
        {todos.length === 0 && (
          <p className="text-white/30 text-xs text-center italic mt-8">
            Empty list. Relax.
          </p>
        )}

        {todos.map((todo) => (
          <div
            key={todo.id}
            className="group flex items-center justify-between p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
          >
            <div
              className="flex items-center gap-2 overflow-hidden flex-1"
              onClick={() => toggleTodo(todo.id)}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${todo.completed ? "bg-[var(--vibe-accent)] border-[var(--vibe-accent)]" : "border-white/30 group-hover:border-[var(--vibe-accent)]"}`}
              >
                {todo.completed && (
                  <Check size={10} className="text-black font-bold" />
                )}
              </div>
              <span
                className={`text-sm truncate transition-all ${todo.completed ? "text-white/30 line-through" : "text-white/90"}`}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-all"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoWidget;
