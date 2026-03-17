# RAG 与 Agent 的结合

检索增强生成（Retrieval-Augmented Generation, RAG）与 Agent 的结合是构建智能问答系统的关键技术。本文介绍如何将 RAG 与 Agent 融合，实现更强大的智能系统。

## RAG 简介

RAG 通过检索外部知识库来增强 LLM 的能力：

```
Query → 检索器 → 相关文档 → LLM → 生成回答
```

核心公式：

$$P(y|x) = P(y|x, z) = \sum_z P(z|x) P(y|x, z)$$

其中 $z$ 是检索到的文档。

## RAG 与 Agent 的融合架构

### 基础架构

```python
class RAGAgent:
    def __init__(self, llm, retriever, tools=None):
        self.llm = llm
        self.retriever = retriever
        self.tools = tools or []
        self.memory = []

    def query(self, question, top_k=3):
        # 1. 检索相关文档
        docs = self.retriever.search(question, k=top_k)

        # 2. 构建上下文
        context = "\n\n".join([d.content for d in docs])

        # 3. 生成回答
        prompt = f"""基于以下参考资料回答问题。

        参考资料：
        {context}

        问题：{question}

        回答："""

        answer = self.llm.generate(prompt)

        # 保存到记忆
        self.memory.append({
            "question": question,
            "answer": answer,
            "sources": [d.metadata for d in docs]
        })

        return answer, docs
```

### 自主决策的 RAG Agent

```python
class AutonomousRAGAgent:
    def __init__(self, llm, retriever, tools):
        self.llm = llm
        self.retriever = retriever
        self.tools = {t.name: t for t in tools}

    def decide_action(self, question, history):
        """决定下一步行动"""
        prompt = f"""你是一个智能助手，需要回答用户问题。

        用户问题：{question}

        历史对话：
        {format_history(history)}

        可用行动：
        1. 检索知识库 - 当需要外部知识时使用
        2. 使用工具 - 当需要执行特定操作时使用
        3. 直接回答 - 当已有足够信息时使用

        请决定下一步行动并说明理由。
        格式：行动: xxx, 理由: xxx"""

        return self.llm.generate(prompt)

    def run(self, question, max_turns=5):
        history = []
        for turn in range(max_turns):
            # 决定行动
            decision = self.decide_action(question, history)

            if "检索知识库" in decision:
                docs = self.retriever.search(question)
                history.append({"role": "assistant", "content": f"检索到 {len(docs)} 篇相关文档"})
                context = "\n\n".join([d.content for d in docs])
                answer = self.llm.generate(f"基于以下资料回答：{context}\n\n问题：{question}")

                history.append({"role": "user", "content": answer})

            elif "使用工具" in decision:
                tool_name = extract_tool(decision)
                result = self.tools[tool_name].execute()
                history.append({"role": "system", "content": f"工具 {tool_name} 返回：{result}"})

            else:
                final_answer = self.llm.generate(f"""
                    综合所有信息回答：
                    {format_history(history)}
                    原始问题：{question}
                """)
                return final_answer

        return "我需要更多时间来回答这个问题。"
```

## 高级特性

### 1. 自适应检索

```python
class AdaptiveRAG:
    def __init__(self, llm, retriever):
        self.llm = llm
        self.retriever = retriever

    def should_retrieve(self, question):
        """判断是否需要检索"""
        prompt = f"""判断以下问题是否需要检索外部知识：

        问题：{question}

        如果问题涉及：
        - 具体的事实或数据
        - 专业领域的知识
        - 最新信息

        则需要检索。请直接回答"需要"或"不需要"。"""

        response = self.llm.generate(prompt)
        return "需要" in response

    def run(self, question):
        if self.should_retrieve(question):
            docs = self.retriever.search(question)
            context = self.build_context(docs)
            return self.llm.generate(f"资料：{context}\n\n问题：{question}")
        else:
            return self.llm.generate(f"问题：{question}")
```

### 2. 多步推理

```python
class MultiStepRAG:
    def __init__(self, llm, retriever):
        self.llm = llm
        self.retriever = retriever

    def decompose_question(self, question):
        """分解复杂问题"""
        prompt = f"""将以下复杂问题分解为简单问题：

        {question}

        列出需要回答的子问题："""

        sub_questions = self.llm.extract_questions(prompt)
        return sub_questions

    def answer(self, question):
        sub_questions = self.decompose_question(question)
        answers = []

        for sq in sub_questions:
            docs = self.retriever.search(sq)
            answer = self.llm.generate(f"根据以下资料回答：{docs}\n\n问题：{sq}")
            answers.append(answer)

        # 整合答案
        final_answer = self.llm.generate(f"""
            原始问题：{question}
            子问题及答案：
            {format_qa(sub_questions, answers)}

            请给出最终、整合后的答案：
        """)

        return final_answer
```

## 应用场景

1. **企业知识库问答**
2. **客服机器人**
3. **学术研究助手**
4. **代码文档助手**
5. **法律顾问系统**

## 总结

RAG 与 Agent 的结合优势：
- **知识时效性**：可以接入最新信息
- **可解释性**：可以追溯答案来源
- **可扩展性**：可以接入各种工具
- **灵活性**：可以根据任务自适应策略
