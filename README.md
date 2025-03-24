# Node.js Worker Threads Demo

This project demonstrates the power of Node.js worker threads by comparing operations with only main thread vs multi-thread operations in a credit card debt processing application.

## Overview

The application provides two endpoints to process credit card debts updates for 150,000 cards:
- Single-threaded implementation
- Multi-threaded implementation using Node.js worker threads

## Performance Comparison

| Implementation  | Processing Time | Threads |
|-----------------|----------------|---------|
| single-threaded | ~1h 30min      | 1       |
| multi-threaded  | ~50 seconds    | 7       |

## API Endpoints

### Blocking I/O
```bash
curl http://localhost:3000/single-threaded
```
This endpoint processes the debt updates sequentially in a single thread.

### Non-blocking I/O with Worker Threads
```bash
curl http://localhost:3000/multi-threaded
```
This endpoint distributes the workload across 7 worker threads, significantly improving performance.

## Project Structure
```
src/
├── single-threaded.js      # Single-threaded implementation
├── server.js           # Express server
├── data/              
│   ├── data.json
│   ├── dataWithPendingDebts.json
│   └── new_data.json
└── worker-thread/
    ├── multi-threaded.js   # Multi-threaded implementation
    └── pending_debts.js     # Worker thread logic
```

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the server:
```bash
npm start
```

## Technical Details

- The application demonstrates the performance impact of using worker threads for CPU-intensive tasks
- The multi-threaded implementation uses 7 concurrent worker threads to process the data
- Each worker thread handles a portion of the 150,000 credit card records
- The blocking implementation processes records sequentially, resulting in longer execution time

## Learning Outcomes

This project serves as a practical example of:
- Node.js Worker Threads implementation
- Performance optimization in Node.js
- Handling CPU-intensive tasks
- Comparing blocking vs non-blocking operations