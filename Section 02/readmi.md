# Section 2: Foundations — LangChain, Agents & Flow

This section builds the **core understanding** required to design and implement **AI agents** using **LangChain**, including how agents think, act, and follow flows.

---

## 1. LangChain — Foundation

### 1.1 What is LangChain?

LangChain is an **open-source framework** used to build applications powered by **Large Language Models (LLMs)**.

It helps developers **connect LLMs with external data, tools, memory, and logic**.

📌 **Key idea:**

> LangChain = LLM + Tools + Memory + Control Flow

---

### 1.2 Why LangChain is Needed

LLMs alone:

* Cannot remember past conversations
* Cannot call APIs or databases
* Cannot follow structured workflows

LangChain solves this by:

* Managing prompts
* Adding memory
* Calling tools
* Creating chains and agents

---

### 1.3 Core Components of LangChain

#### 1. LLMs / Chat Models

* OpenAI (GPT)
* Anthropic (Claude)
* Google (Gemini)
* Open-source models

Used to **generate text or decisions**.

---

#### 2. Prompts

Templates that guide LLM behavior.

Example:

```text
You are a helpful assistant. Answer step by step.
Question: {input}
```

Types:

* PromptTemplate
* ChatPromptTemplate

---

#### 3. Chains

A **sequence of operations**.

📌 Output of one step becomes input of next.

Example:

* Input → Prompt → LLM → Output

Common chains:

* LLMChain
* SequentialChain
* RouterChain

---

#### 4. Memory

Allows LLMs to **remember context**.

Types of memory:

* ConversationBufferMemory
* ConversationSummaryMemory
* VectorStoreMemory

📌 Memory makes AI conversational and contextual.

---

#### 5. Tools

External functions that agents can use.

Examples:

* Web search
* Calculator
* Database query
* API calls

📌 Tools give **real-world capability**.

---

### 1.4 LangChain Architecture (Simple)

```
User Input
   ↓
Prompt Template
   ↓
LLM
   ↓
Tool / Memory / Chain
   ↓
Final Response
```

---

### 1.5 LangChain Use Cases

* Chatbots
* AI Agents
* Document Q&A
* Code assistants
* Autonomous workflows

---

## 2. Agents — Core Concept

### 2.1 What is an Agent?

An **Agent** is an AI system that:

* Thinks
* Decides
* Uses tools
* Acts autonomously

📌 **Agent = LLM + Reasoning + Tools + Control**

---

### 2.2 Agent vs Chain

| Chain              | Agent           |
| ------------------ | --------------- |
| Fixed steps        | Dynamic steps   |
| No decision making | Decision making |
| Predictable        | Flexible        |

---

### 2.3 How an Agent Works

1. Receives a task
2. Thinks about what to do
3. Chooses a tool
4. Executes the tool
5. Observes result
6. Repeats until goal is achieved

---

### 2.4 Agent Loop (Think → Act → Observe)

```
Think: What should I do?
Act: Call a tool
Observe: Analyze tool result
Repeat until done
```

---

### 2.5 Types of Agents in LangChain

#### 1. ReAct Agent

* Reason + Action
* Most commonly used

#### 2. Tool-Calling Agent

* Uses structured tool calls
* More reliable

#### 3. Plan-and-Execute Agent

* Creates plan first
* Executes step by step

---

### 2.6 Tools Used by Agents

Examples:

* Search tool
* Calculator
* Python tool
* Database tool
* Custom API tool

📌 Agents decide **which tool to use and when**.

---

### 2.7 Agent Example (Conceptual)

Task: "Find weather and suggest clothes"

Steps:

1. Search weather
2. Analyze temperature
3. Recommend clothing

---

## 3. Flow — Control & Execution Logic

### 3.1 What is Flow?

Flow defines **how tasks move from one step to another**.

📌 Flow = Decision + Sequence + Conditions

---

### 3.2 Why Flow is Important

Without flow:

* No structure
* No reliability

With flow:

* Predictable execution
* Error handling
* Scalable logic

---

### 3.3 Types of Flow

#### 1. Sequential Flow

Steps run one after another.

```
Step 1 → Step 2 → Step 3
```

---

#### 2. Conditional Flow

Flow depends on condition.

```
If success → Continue
Else → Retry / Stop
```

---

#### 3. Loop Flow

Repeats until condition met.

Used in agents.

---

### 3.4 Flow in LangChain

Flow is implemented using:

* Chains
* Agents
* Routers
* Custom logic (Python/JS)

---

### 3.5 Agent Flow Example

```
User Query
   ↓
Agent Thinks
   ↓
Choose Tool
   ↓
Tool Output
   ↓
Decision
   ↓
Final Answer
```

---

## 4. LangChain + Agents + Flow (Together)

### 4.1 How They Work Together

| Component | Role            |
| --------- | --------------- |
| LangChain | Framework       |
| Agent     | Decision maker  |
| Flow      | Execution logic |

---

### 4.2 Real-World Example

AI Customer Support Agent:

* LangChain manages prompts & memory
* Agent decides what to answer or fetch
* Flow controls escalation and retries

---

## 5. Beginner → Advanced Progression

### Beginner

* Prompt templates
* Simple chains

### Intermediate

* Memory
* Tool integration

### Advanced

* Multi-agent systems
* Complex flows
* Autonomous agents

---

## 6. Exam / Interview Key Points

✔ LangChain connects LLMs with tools and memory
✔ Agents can reason and act dynamically
✔ Flow defines execution structure
✔ Agent loop: Think → Act → Observe
✔ Chains are fixed, agents are flexible

---

### ✅ Section 2 Completed

This foundation is essential before building **real AI agents and workflows**.
