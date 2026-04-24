# Feynman Explanation: How HTTP Works

> Rule: if you can't explain it simply, you don't understand it well enough.

---

## The Postal Service Analogy

Imagine the internet as a global postal service, but for information.

**You (the browser)** want to read an article on a website. You write a **letter** (HTTP request) that says:

> "Hey, I'd like the article at /blog/hello-world please."

You put that letter in an envelope, write the website's address on it (the IP address, resolved from the domain name by DNS — like looking up a phone number in a directory), and send it off.

The letter travels through many **sorting offices** (routers) until it reaches the website's **mail room** (the web server).

The server reads your letter, goes to its **filing cabinet** (database or filesystem), finds the article, and sends you back a **response letter** containing the HTML content.

---

## The Key Ideas, Plain English

**1. HTTP is stateless**  
Each request is independent. The server doesn't remember your previous requests. It's like calling customer service — each call, you have to re-identify yourself. That's why we have tokens (JWTs): you hand your "membership card" with every request.

**2. Requests have a method (verb)**  
When you type a URL in a browser, you're doing a GET — "please give me this thing."  
When you submit a form (log in, post a comment), you're doing a POST — "here's some data, do something with it."  
PUT replaces, PATCH partially changes, DELETE removes.

**3. Responses have status codes**  
The server's way of saying:
- `200 OK` → "here you go"
- `404 Not Found` → "I don't have that"
- `401 Unauthorized` → "who are you?"
- `403 Forbidden` → "I know who you are, but no"
- `500 Internal Server Error` → "I broke"

**4. HTTPS adds a sealed envelope**  
Without HTTPS, anyone on the network can read your letters (like postcards). HTTPS wraps everything in TLS encryption — a sealed, tamper-proof envelope that only the recipient can open.

---

## The DNS Phonebook

`example.com` means nothing to network hardware. It only understands numbers (IP addresses like `203.0.113.5`).

DNS is the phonebook: you look up `example.com`, it gives you back `203.0.113.5`. Your computer asks a **resolver** (usually your ISP's), which asks the right authority, and caches the answer so it doesn't have to look it up every time.

---

## What Actually Happens When You Press Enter

1. Browser checks DNS cache → if not found, asks DNS resolver  
2. Resolver returns IP address  
3. Browser opens a TCP connection (3-way handshake: SYN → SYN-ACK → ACK)  
4. For HTTPS: TLS handshake negotiates encryption keys  
5. Browser sends HTTP request  
6. Server processes request, queries database if needed  
7. Server sends HTTP response (HTML, JSON, image...)  
8. Browser parses and renders the content  

All of that happens in under a second for a well-optimized site.

---

## The "Aha" Moment

HTTP is just text messages sent over a reliable connection. That's it. The entire web runs on carefully formatted text messages that follow agreed-upon rules. The magic is the standardization — every browser and server speaks the same language.

---

## Test Yourself (Feynman Check)

Can you explain to a 10-year-old:
- [ ] Why does the address bar show "https" and not "http"?
- [ ] Why does logging into a website need a password every time you close the browser?
- [ ] What happens if the server is down when you try to visit a site?
