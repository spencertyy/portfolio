// The single source of truth for coursework. Adding a project means adding an
// entry here and dropping its image in /public/coursework — the index grid, the
// detail page, its metadata and its static route all follow from this.
//
// Order is display order, and it is an editorial decision rather than a
// chronological one: what an interviewer is most likely to want to open first.
// Visual-and-deep leads, protocol work follows, and the group project is last
// because shared authorship is the hardest thing to talk about in an interview.

export type Project = {
  /** URL segment. Lowercase, hyphenated, and permanent once shared. */
  slug: string;
  title: string;
  /** Course or context, e.g. "CS 6015 · University of Utah". */
  context: string;
  /** Optional, and worth keeping optional: seven of these repositories were
   *  published well after the work was done, so their commit dates prove
   *  nothing. These read "2023–2024" — the span of the degree — rather than a
   *  specific year invented from a git log. */
  year?: string;
  /** One clause, shown under the title in the grid. */
  summary: string;
  role?: string;
  stack: string[];
  /** Body copy, one string per paragraph. */
  body: string[];
  github?: string;
  live?: string;
  image?: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  /** An mp4 beside the still. When present the tile plays it and `image` becomes
   *  the poster frame — see components/Motion.tsx for why these are videos and
   *  not the GIFs the repositories ship. */
  video?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "dijkstra-visualization",
    title: "Dijkstra's Algorithm, Visualised",
    context: "University of Utah",
    year: "2024",
    summary:
      "An interactive D3 rendering of shortest-path search, animated one relaxation at a time.",
    stack: ["JavaScript", "D3.js", "HTML", "CSS"],
    body: [
      "A 4×4 grid of sixteen nodes and twenty-four weighted edges, with Dijkstra's algorithm running over it in the browser. The point was not to compute the shortest path — it was to make the intermediate state visible, because the part of the algorithm people misremember is the middle, not the answer.",
      "So the animation gives each phase its own colour: yellow for the node currently being visited, green for an edge being relaxed, purple for the path that survives at the end. Watching a green edge fail to improve a distance explains edge relaxation faster than the pseudocode does.",
      "The priority queue is written by hand rather than imported — an array with sorted insertion, which puts the implementation at O(V²). A binary min-heap would take it to O((V + E) log V), and at sixteen nodes the difference is invisible, which is exactly why it is worth knowing that the choice was made rather than defaulted into.",
    ],
    github:
      "https://github.com/spencertyy/Dijkstra-s-Algorithm-Visualization",
    live: "https://spencertyy.github.io/Dijkstra-s-Algorithm-Visualization/",
    image: {
      src: "/coursework/dijkstra.jpg",
      width: 800,
      height: 450,
      alt: "Graph visualisation mid-run: nodes and weighted edges, with the current node and relaxing edge highlighted",
    },
    video: "/coursework/dijkstra.mp4",
  },
  {
    slug: "websocket-chat-server",
    year: "2023–2024",
    title: "WebSocket Chat Server",
    context: "University of Utah",
    summary:
      "A multithreaded Java server implementing HTTP and RFC 6455 by hand — no frameworks.",
    stack: ["Java", "ServerSocket", "WebSocket (RFC 6455)", "JavaScript"],
    body: [
      "A chat server built from `ServerSocket` upward: it parses the HTTP request line and headers itself, serves the browser client as static files, then upgrades the connection to a WebSocket and takes over the socket. No Spring, no Netty, no library doing the protocol.",
      "The handshake is the part worth reading. A client sends `Sec-WebSocket-Key`; the server has to concatenate a fixed GUID, take SHA-1, Base64 the digest, and return it as `Sec-WebSocket-Accept`. Get one byte wrong and the browser closes the connection with no useful error — which is what makes implementing it, rather than importing it, the thing you remember.",
      "Frame decoding handles all three payload-length forms in the spec: the 7-bit case, the extended 16-bit case, and the extended 64-bit case. Client-to-server frames are always masked, so every payload byte is XORed against a rotating four-byte key before it means anything. Static file serving is guarded against path traversal — requests resolving outside the resources directory get a 404 rather than the filesystem.",
    ],
    github: "https://github.com/spencertyy/websocket-chat-server",
    image: {
      src: "/coursework/websocket.png",
      width: 2410,
      height: 1442,
      alt: "Browser chat UI served by the Java WebSocket server, with a room list and message history",
    },
  },
  {
    slug: "synthesizer",
    year: "2023–2024",
    title: "Node-Based Audio Synthesizer",
    context: "University of Utah",
    summary:
      "A JavaFX patch editor — drag a line between two nodes to wire an audio signal chain.",
    stack: ["Java 21", "JavaFX", "Maven", "javax.sound.sampled"],
    body: [
      "A visual synthesizer in the modular tradition: components sit on a canvas as nodes, and you build the instrument by dragging a line from one node's output circle to another's input. Sine wave generators feed a mixer, the mixer feeds a volume stage, and the volume stage feeds the speaker.",
      "Two problems meet in this one. The interface problem is a node-graph editor — hit targets, live connection previews, and a data model where the wiring is the program rather than a setting on it. The audio problem is generating 16-bit PCM at 44.1 kHz and keeping the buffer fed, where being late is not a slow frame but an audible click.",
      "The guitar-tuning shortcuts came last and are the part I would defend hardest: six buttons that set the oscillator to E2, A2, D3, G3, B3 and E4. Frequency in hertz is the honest control and it is also the useless one — nobody knows what 196 Hz sounds like, and everybody knows what a G string sounds like.",
    ],
    github: "https://github.com/spencertyy/Synthesizer",
    image: {
      src: "/coursework/synthesizer.png",
      width: 1600,
      height: 1256,
      alt: "JavaFX synthesizer window: component nodes connected by dragged lines into a signal chain",
    },
  },
  {
    slug: "tls-handshake",
    year: "2023–2024",
    title: "TLS Handshake, From Scratch",
    context: "University of Utah",
    summary:
      "Mutual certificate authentication, Diffie–Hellman key exchange and AES messaging, implemented in Java.",
    stack: ["Java", "Diffie–Hellman", "AES/CBC", "HMAC-SHA256", "X.509"],
    body: [
      "The handshake that precedes every HTTPS connection, written out by hand. Client and server each present a certificate, each verifies the other against a shared certificate authority, and both then derive a shared secret over a 2048-bit MODP group from RFC 3526 without that secret ever crossing the wire.",
      "Mutual authentication is the part most implementations skip — the usual web case only verifies the server. Here both sides check, which means a client certificate that does not chain to the CA ends the connection before any application data exists.",
      "Once the shared secret exists it is used two ways: as an AES/CBC key for confidentiality, and as an HMAC-SHA256 key for integrity. Those are separate properties and it is worth being able to say why encryption alone does not give you the second one — a ciphertext an attacker cannot read is still a ciphertext they can corrupt.",
    ],
    github: "https://github.com/spencertyy/TLS-handshake-java",
    image: {
      src: "/coursework/tls.png",
      width: 1600,
      height: 508,
      alt: "Terminal output showing the handshake completing and encrypted messages exchanged",
    },
  },
  {
    slug: "dns-resolver",
    year: "2023–2024",
    title: "DNS Resolver",
    context: "University of Utah",
    summary:
      "A caching DNS server that decodes the wire format byte by byte, including name compression.",
    stack: ["Java", "UDP", "DNS (RFC 1035)"],
    body: [
      "A resolver listening on UDP port 8053. A query that is already cached is answered locally; a query that is not is forwarded to Google Public DNS and the response cached on the way back, with expiry driven by each record's own TTL rather than by a fixed timeout.",
      "The interesting part is the wire format. DNS predates the era when a protocol would simply spend the bytes, so a domain name in a response can be a pointer back into an earlier part of the same packet — two bytes standing in for a name that already appeared. Parsing that means following offsets inside a buffer you are still reading, and getting it wrong produces names that look almost right, which is the worst kind of bug to find.",
      "Both A and AAAA records are parsed, so IPv4 and IPv6 answers both survive the round trip. It can be pointed at with `dig` or `nslookup` like any other resolver.",
    ],
    github: "https://github.com/spencertyy/DNS-resolver",
    image: {
      src: "/coursework/dns.jpg",
      width: 790,
      height: 560,
      alt: "Terminal showing dig queries resolved by the server, with cache hits and misses",
    },
    video: "/coursework/dns.mp4",
  },
  {
    slug: "not-the-crab",
    year: "2023–2024",
    title: "Not The Crab",
    context: "University of Utah",
    summary:
      "A browser game on HTML5 Canvas — seven crabs track your cursor in real time.",
    stack: ["JavaScript", "HTML5 Canvas", "requestAnimationFrame"],
    body: [
      "Seven crabs, one cursor, and a full-screen canvas. Each crab computes the vector to the pointer every frame, normalises it, and steps along it at its own randomly assigned speed — so they converge from different directions and at different rates rather than moving as a block. Touch one and the run ends.",
      "The loop runs on `requestAnimationFrame` rather than a timer, which means the browser schedules it against the display refresh and pauses it when the tab is hidden — a `setInterval` would keep computing positions for a canvas nobody is looking at.",
      "Rendering each crab uses the save / translate / draw / restore pattern: the canvas origin moves to the sprite's centre, the sprite is drawn around that origin, and the transform is popped before the next one. Without the restore, every transform composes onto the last and the scene drifts a little further off-screen each frame.",
    ],
    github: "https://github.com/spencertyy/NotTheCrab",
    live: "https://spencertyy.github.io/NotTheCrab/NotTheCrab/NotTheBees.html",
    image: {
      src: "/coursework/crab.png",
      width: 840,
      height: 560,
      alt: "Canvas game in play: crabs scattered across a white field, converging on the cursor",
    },
  },
  {
    slug: "pacman",
    year: "2023–2024",
    title: "Pacman",
    context: "University of Utah",
    summary:
      "A desktop Pacman in C++ and SFML — tile collision, ghosts, and tunnel wrap-around.",
    stack: ["C++", "SFML", "CMake"],
    body: [
      "Pacman rebuilt as a native desktop game: a render loop over an `sf::RenderWindow`, sprites drawn from textures, and movement driven by polled keyboard state rather than key events, so holding a direction keeps you moving.",
      "The map is tile-based, which turns collision from a geometry problem into a lookup — before a move commits, the destination tile is checked for a wall. That is also what makes the classic tunnel behaviour cheap: walking off one edge of the grid wraps the coordinate to the other side instead of being a special case in the physics.",
      "Pellet tracking drives both ends of the game: consuming the last one triggers the win screen, and contact with a ghost ends it. The code is split by responsibility rather than kept in the loop, which is the difference between a game you can add a level to and one you cannot.",
    ],
    github: "https://github.com/spencertyy/PacMan",
    image: {
      src: "/coursework/pacman.jpg",
      width: 320,
      height: 344,
      alt: "Pacman gameplay: tile maze with pellets, the player sprite, and a ghost",
    },
    video: "/coursework/pacman.mp4",
  },
  {
    slug: "unix-shell",
    year: "2023–2024",
    title: "Unix Shell",
    context: "University of Utah",
    summary:
      "A working shell in C++ — fork and exec, redirection, and pipelines built on raw file descriptors.",
    stack: ["C++", "POSIX", "Make"],
    body: [
      "An interactive shell that does what a shell does: read a line, work out what was meant, and hand it to the kernel. External programs run through `fork()` and `execvp()`, `cd` is built in because a child process cannot change its parent's working directory, and Ctrl+D exits cleanly rather than looping on an empty read.",
      "Redirection and pipelines are the same mechanism seen twice. Both come down to rearranging file descriptors between the fork and the exec — the child rewires its own stdin or stdout, then replaces itself with the target program, which never learns that its input was not a terminal.",
      "Every process in a pipeline is forked before the shell waits on any of them. Waiting on the first child before starting the second deadlocks as soon as the pipe buffer fills: the writer blocks waiting for room, the reader has not been started, and nothing moves. That failure is easy to write and hard to spot, because short commands work fine.",
    ],
    github: "https://github.com/spencertyy/Unix-shell",
    image: {
      src: "/coursework/shell.jpg",
      width: 790,
      height: 560,
      alt: "Terminal session showing the shell running commands with pipes and redirection",
    },
    video: "/coursework/shell.mp4",
  },
  {
    slug: "rain-catcher",
    title: "Rain Catcher",
    context: "CS 6015 · University of Utah",
    year: "2024",
    summary:
      "A timed Qt arcade game with accounts and a persistent leaderboard. Three-person team.",
    role: "One of three developers — Katie Stokes, Spencer Tu, Terry Cao",
    stack: ["C++", "Qt 6", "qmake"],
    body: [
      "A one-minute arcade game: move a bucket left and right to catch falling droplets, with the fall speed rising as your score does, so the round gets harder exactly as you get better at it.",
      "The scope beyond the game loop is what made it a software engineering project rather than a graphics one — accounts with sign-up and login, a guest path for people who will not make an account for a browser game, scores persisted across sessions into a leaderboard, and audio feedback on catch and miss.",
      "Built by three people in a shared Qt codebase, which is its own lesson: the merge conflicts were never in the game logic, they were in the `.pro` file and the generated UI files that everyone's IDE rewrote slightly differently.",
    ],
    github: "https://github.com/spencertyy/QtGameGroupProject",
    image: {
      src: "/coursework/rain-catcher.jpg",
      width: 913,
      height: 542,
      alt: "Rain Catcher gameplay: a bucket catching falling droplets, with score and timer",
    },
    video: "/coursework/rain-catcher.mp4",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
