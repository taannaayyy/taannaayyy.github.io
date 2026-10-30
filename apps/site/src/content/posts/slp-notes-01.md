---
title: "SLP notes 1.2: What do LLMs learn from predicting the next token?"
description: "How a model trained only to predict the next token ends up knowing so much, and learning the wrong things too: the distributional hypothesis, tokens, pretraining, conditional generation and the Shannon game."
pubDatetime: 2026-10-31T01:00:00+03:00
tags: ["nlp", "llms"]
series: "Speech and Language Processing notes"
math: false
---

> [!NOTE]
> These are my notes on **Section 1.2** of Dan Jurafsky and James H. Martin,
> _[Speech and Language Processing](https://web.stanford.edu/~jurafsky/slp3/)_,
> 3rd ed. draft (August 19, 2026 release),
> [Chapter 1](https://web.stanford.edu/~jurafsky/slp3/1.pdf).

## 1.2 What do LLMs learn from word (token) prediction?

The question this section answers: how does a model that is only ever trained to guess the next word end up knowing so much?

### What children can teach us

A young child knows only a few words, which limits what they can understand and say. Their vocabulary grows as they read and hear more, and to reach an adult vocabulary of roughly 30,000 to 100,000 words by about age 20, children have to pick up somewhere around **7 to 10 new words a day**.

The surprising part: at some stages, a learner's vocabulary grows _faster_ than new words actually come their way. So meeting one word must also teach us something about other, related words. We don't learn words one by one in isolation; a lot of what we know about a word comes from the words that usually surround it.

### The distributional hypothesis

This idea goes back to linguists of the 1950s and is known as the **distributional hypothesis**.

> If two words tend to show up with the same kinds of neighbouring words, they probably mean something similar.

**An example in Turkish.** Say you've never seen the word _papatya_, and you come across these sentences:

1. _Bahçedeki papatyayı kokladım._ (I smelled the papatya in the garden.)
2. _Papatyaları bugün suladım._ (I watered the papatyas today.)

You already know sentences that look very much like them:

1. _Bağdaki gülü kokladım._ (I smelled the rose in the vineyard.)
2. _Bugün gülleri suladım._ (I watered the roses today.)

_Papatya_ turns up in the same kinds of contexts as _gül_ (rose): it's something you smell and something you water. So it's a safe guess that _papatya_ is a flower too, and it is: it means daisy.

### Word or token?

Strictly speaking, LLMs don't predict words; they predict **tokens**. A token is a unit that the model's tokenizer splits text into. It's often a whole word, but it can also be part of a word, a single character or a punctuation mark. Frequent words usually become a single token, while rarer or longer words are broken into several.

This matters a lot for Turkish, where suffixes stack up on a root. A single word like _kitaplarımızdan_ (from our books) might be split into pieces such as _kitap + lar + ımız + dan_. Real tokenizers split text based on how often character sequences appear in their training data, not on grammar, so the actual pieces can differ, but one Turkish word often ends up as several tokens.

That's why the book writes "word (token)": "the next word" is the intuitive way to say it, and "the next token" is what actually happens.

### Pretraining

LLMs learn in much the same way as children, only at a vastly larger scale. They are trained to guess the next token over and over across an enormous collection of text. Along the way, they absorb how words relate to one another and, through those relations, a great deal about the world.

This training is **self-supervised**: the correct answer at every step is simply the next token in the text itself, so nobody has to label any data by hand.

To see why that's special, compare it with ordinary **supervised learning**. To train a spam filter, people first have to go through thousands of emails and mark each one as "spam" or "not spam". Every training example is an input paired with a label that a human provided, and that labelling is slow and expensive.

Next-token prediction doesn't need any of that, because plain text already contains its own answers. Take one sentence (split into whole words here to keep it simple):

_Bugün hava çok güzel._ (The weather is very nice today.)

Hiding everything after each position turns it into several training examples, each with a known correct answer:

| What the model sees     | What it must predict |
| ----------------------- | -------------------- |
| _Bugün_                 | _hava_               |
| _Bugün hava_            | _çok_                |
| _Bugün hava çok_        | _güzel_              |
| _Bugün hava çok güzel_  | _._                  |

For each row, the model gives every possible next token a probability, then checks how much probability it gave the real one. Training adjusts the model a little so that next time, the real token gets a higher probability. The "labels" come for free from the text.

This is what makes LLMs possible at their scale. Every sentence ever written becomes training data with no extra human work, so a model can learn from billions of pages of books, articles and websites. Hand-labelling even a tiny fraction of that would be impossible.

Training a model on next-token prediction, so that it picks up this knowledge as a side effect, is called **pretraining**.

### What does the model actually learn?

Think about what a model has to "know" to fill in each of these blanks correctly (the answer is in brackets):

- _Masada elma, armut ve muz vardı; kısacası bol bol \_\_\_ vardı._ [meyve] (There were apples, pears and bananas on the table; in short, plenty of [fruit].) The model learns **categories**: apples, pears and bananas are all kinds of fruit.
- _Su ılık değildi, resmen \_\_\_._ [kaynıyordu] (The water wasn't warm, it was [boiling].) It learns **scales**: boiling is further along the same scale as warm.
- _12'nin yarısı \_\_\_._ [6] (Half of 12 is [6].) It learns some **arithmetic**.
- _Türkiye'nin başkenti \_\_\_._ [Ankara] (The capital of Türkiye is [Ankara].) It learns **facts about the world**.

Nobody taught the model any of this directly. It's a side effect of getting its predictions right.

**But the same mechanism can teach a model the wrong meanings, too.** The model only sees which words appear together. It has no way to tell a relationship that is _true_ from one that is just _common_ in its training text, so it learns both in exactly the same way:

- **Opposites can look like synonyms.** _Sıcak_ (hot) and _soğuk_ (cold) appear in almost identical contexts (_Bugün hava çok sıcak._ / _Bugün hava çok soğuk._). Judged only by their neighbours, as the distributional hypothesis suggests, they look like they mean nearly the same thing, even though they mean the opposite.
- **Stereotypes can become part of a word's "meaning".** If the training text mostly continues "the doctor said that…" with _he_ and "the nurse said that…" with _she_, the model learns that association as if it were part of what _doctor_ and _nurse_ mean. Turkish makes this easy to see: its pronoun _o_ has no gender, yet translation systems have rendered _O bir doktor_ as "He is a doctor" and _O bir hemşire_ as "She is a nurse" ([Caliskan et al., 2017](https://doi.org/10.1126/science.aal4230)).

In short, prediction rewards whatever patterns are frequent in the data, so a language model can learn wrong or unfair meanings of words simply because those patterns were common in the text it was trained on.

### 1.2.1 Prompting = conditional generation = token prediction

A **prompt** is the text we give an LLM. The model replies by writing one token at a time. At each step, it assigns a probability to every token in its vocabulary, based on two things:

1. the prompt itself, and
2. every token the model has written so far.

Then one token is chosen: either the most likely one (greedy decoding) or one sampled at random according to those probabilities.

Producing text this way, one token after another based on what came before, is called **conditional generation**.

#### So how does that answer a question?

From the model's point of view, a good answer is simply the most natural way for a question to continue. Its training text is full of answers that directly follow questions, like FAQ pages and tables of short factual questions, so the correct answer is often the most likely next thing to write.

#### Instruction tuning

Pretraining on its own doesn't make a model reliably do what we ask. That's why LLMs get a further round of training, called **instruction tuning**, which teaches them to respond helpfully to instructions. Unlike pretraining, this step uses a labelled dataset. IBM defines it this way:

> Instruction tuning is a technique for fine-tuning large language models (LLMs) on a labeled dataset of instructional prompts and corresponding outputs.
>
> — Dave Bergmann, [“What Is Instruction Tuning?”](https://www.ibm.com/think/topics/instruction-tuning), IBM, 2024

### 1.2.2 The Shannon game

Predicting the next piece of text is a much older idea than LLMs. In the late 1940s, Claude Shannon, together with the psychologists George Miller and Jennifer Selfridge, put it on a formal footing, and it is often explained through a guessing game called the **Shannon game**.

The rules are simple. One person picks a short passage, and the other tries to guess it from left to right, one unit at a time. After every guess, the guesser is told whether it was right, and if it was wrong, they're shown the correct unit. Either way, they always know the true text so far and can use it for the next guess.

Shannon's original version used letters instead of words. When you play it, a pattern appears quickly: wrong guesses pile up at the beginning of words and at points where many continuations are possible, like right after an article or an adjective, and become rare toward the end of a word. Shannon used the game to estimate how much information language carries, as part of his work on information theory and data compression.

You can feel this in Turkish: after _Bugün hava çok gü…_, almost anyone would guess _güzel_ (nice), so the remaining letters add very little new information.

This loop of guessing the next unit, seeing the right answer and adjusting is exactly the intuition behind pretraining: the model guesses the next token, is shown the real one, and updates itself to do better next time. The book develops this further in Section 1.6.
