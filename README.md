# 📝 Task Manager App

Uma aplicação moderna de gerenciamento de tarefas (To-Do List) desenvolvida com tecnologias atuais do ecossistema JavaScript. O projeto permite criar, editar, concluir e excluir tarefas de forma simples e intuitiva.

---

## 🚀 Tecnologias utilizadas

Este projeto foi desenvolvido utilizando:

* ⚡ Next.js – Framework fullstack para aplicações React
* ⚛️ React – Biblioteca para construção de interfaces
* 🗄️ PostgreSQL – Banco de dados relacional
* 🔗 Prisma – ORM para manipulação do banco de dados
* 🎨 shadcn/ui – Componentes modernos e acessíveis
* 🎯 Lucide React – Biblioteca de ícones

---

## ✨ Funcionalidades

* ✅ Criar tarefas
* 📝 Editar tarefas
* ❌ Deletar tarefas
* 🔄 Marcar como concluída / pendente
* 🧹 Limpar tarefas concluídas
* 🔍 Filtrar tarefas:

  * Todas
  * Pendentes
  * Concluídas
* 📊 Barra de progresso das tarefas

---

## 🧠 Arquitetura do Projeto

O projeto segue boas práticas modernas de desenvolvimento:

* Separação de responsabilidades (UI vs lógica)
* Uso de **Custom Hooks** (`useTasks`)
* Server Actions para comunicação com o backend
* Componentização com React

```
📁 src
 ├── 📁 actions        # Funções de acesso ao banco
 ├── 📁 components     # Componentes reutilizáveis
 ├── 📁 hooks          # Hooks customizados (lógica)
 ├── 📁 app            # Rotas do Next.js
 └── 📁 lib            # Configurações (Prisma, etc.)
```

---

## 👨‍💻 Autor

Desenvolvido por Ana Flávia Covre 🚀
