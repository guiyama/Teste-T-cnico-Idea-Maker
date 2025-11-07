import http from 'k6/http';
import { check, sleep, fail } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },   // warm-up
    { duration: '1m', target: 50 },    // carga moderada
    { duration: '1m', target: 100 },   // carga média
    { duration: '1m', target: 150 },   // carga alta
    { duration: '1m', target: 200 },   // carga extrema
    { duration: '30s', target: 0 },    // ramp-down
  ],
  thresholds: {
    http_req_duration: [
      'p(95)<500',  // 95% das requisições devem ser < 500ms
    ],
    http_req_failed: [
      'rate<0.01',  // < 1% de falhas aceitável
    ],
  },
};

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function () {
  const res = http.get(BASE_URL);

  const ok = check(res, {
    'status 200': (r) => r.status === 200,
    'tempo de resposta < 500ms': (r) => r.timings.duration < 500,
  });

  if (!ok) {
    fail(`Falha detectada — Status: ${res.status}, Tempo: ${res.timings.duration} ms`);
  }

  sleep(1);
}
