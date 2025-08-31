# 🎨 Website Builder (Drag & Drop)

A **React-based drag-and-drop website builder** that allows you to design web layouts visually. You can drag components (like text, images, buttons, containers, and columns) onto a canvas, edit their properties, and preview your design in real time.  

---

## 🚀 Features
- 🖱️ **Drag & Drop Components**: Text, Headings, Buttons, Images, Containers, and Columns.  
- ⚡ **Live Property Editing**: Update text, colors, spacing, alignment, and more.  
- 📱 **Responsive Viewports**: Switch between **Mobile**, **Tablet**, and **Desktop** preview modes.  
- 👁️ **Preview Mode**: Instantly preview your design.  
- 💾 **Save (extendable)**: Add persistence for your layouts.  
- 🎨 **Beautiful UI**: Styled with **Tailwind CSS** + **shadcn/ui** + **lucide-react** icons.  

---

## 🛠️ Tech Stack
- **React** (Functional components + hooks)  
- **Tailwind CSS** for styling  
- **Lucide React** for icons  
- **Framer Motion** ready (optional for animations)  

---

## 📂 Project Structure
/src
├── components/
│ └── DragAndDropBuilder.jsx # Main drag-and-drop builder
├── App.js # Entry point
├── index.js # React DOM render
└── styles/ # Tailwind CSS setup

yaml
Copy code

---

## ⚡ Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/YOUR_USERNAME/web_maker.git
cd web_maker
2. Install Dependencies
bash
Copy code
npm install
3. Run Development Server
bash
Copy code
npm run dev
Now visit http://localhost:5173/ (or the port Vite gives you).

🖥️ Usage
Drag components from the left sidebar onto the canvas.

Select a component to edit its properties in the properties panel (right side).

Switch between Mobile / Tablet / Desktop views using the toolbar.

Click Preview to see the final design.

📸 Demo Screenshots
Add screenshots here after running the app.