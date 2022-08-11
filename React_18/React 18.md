# React 18

날짜: May 15, 2022
주제: React18

[Introducing React 18 · Discussion #4 · reactwg/react-18](https://github.com/reactwg/react-18/discussions/4)

- concurrent
    
    ### 동시성
    
    2개 이상의 독립적인 작업을 **잘게** **나누어** 동시에 실행되는 것처럼 **보이도록** 프로그램을 구조화하는 방법이다.
    
    싱글 코어에서 동시에 최소 두 개의 task가 실행되는 것처럼 보이게하기 위해 컨텍스트 스위치를 이용해 작업을 수행한다.
    
    ### Concurrent Rendering Mechanism
    
    react가 동시에 여러 버전의 UI를 준비할 수 있도록 하는 새로운 **비하인드** 메커니즘이다.
    
    스케쥴링, 중단을 통해 우선순위 기반 렌더링이 가능해진다.
    
    Concurrency is not a feature, per se. It’s a new behind-the-scenes mechanism that enables React to prepare multiple versions of your UI at the same time
    
    there is no concurrent mode - there are only concurrent features
    
    - createRoot 실행시 내부적으로 concurrent mode 활성화
    - concurrent features를 사용할 때만 concurrent rendering 수행
    
    ### Blocking rendering의 문제점
    
    main thread에서 한번에 하나씩 연산된다 → 하나의 연산이 오래걸리면 다음 작업을 진행할 수 없다.
    
    ~~문제를 해결하기 위해 이전해 했던 방법 : 검색어 입력시 debounde, throttle으로 입력하는 동안 혹은 일정한 주기로 화면을 그리도록 지연시킴~~
    
    **New Feature: Transitions
    긴급한 업데이트과 그렇지 않은 업데이트를 구분하기 위한 react의 새로운 개념**
    
    - 급한 업데이트
        - 타이핑, 클릭, 누르기 등 직접적인, 즉각적인 상호작용
    - 전환(덜 급한) 업데이트
        - 한 view에서 다른 view로 이동
        - 새로고침
        - [https://ko.reactjs.org/docs/concurrent-mode-patterns.html](https://ko.reactjs.org/docs/concurrent-mode-patterns.html)
        - [https://reactjs.org/blog/2022/03/29/react-v18.html#new-feature-transitions](https://reactjs.org/blog/2022/03/29/react-v18.html#new-feature-transitions)
    
    ```jsx
    import {startTransition} from 'react';
    
    // Urgent: 높은 우선순위 업데이트 
    setInputValue(input);
    
    // 상태 업데이트를 startTransition로 표시
    *startTransition*(() => {
      // Transition: 낮은 우선순위 업데이트 예약
      setSearchQuery(input);
    });
    ```
    
    input 컴포넌트 렌더링 : 급합
    
    input에 의한 목록 컴포넌트 렌더링 : 바로 처리 안해도 괜찮음
    
    |  | 렌더링 시작! | 일정 시간 양보 | 급한 렌더링이 들어오면 
    우선 순위 높은것 먼저 처리  | 낮은 순위 렌더링 ㄱ |
    | --- | --- | --- | --- | --- |
    | 급한 렌더링 | ✅ |  | ✅ |  |
    | 덜 급한 렌더링 |  | ✅ | 🛑 | ✅ |
    
    - `startTransition`
        - 동시성 모드에서 업데이트 우선 순위가 있음
        - 현재 상태만 반영하도록 중간 상태는 건너 뜀 → 짧은 순간 업데이트는 마지막 값 반영
        - useTransition을 사용할 수 없을 때 사용하도록 설계되었음
    - `useTransition`: a hook to start transitions, including a value to track the pending state.
        - `const [isPending, startTransition] = useTransition();`
        
        ```jsx
        const [startTransition, isPending] = useTransition({
         timeoutMs: 3000
        });
        ```
        
    - `useDeferredValue`
        - `useTransition` - state 업데이트 코드 래핑 `useDeferredValue` - state 업데이트에 영향을 받는 값을 래핑 둘 다 같은 목표를 가지고있기 때문에 같이 쓸 필요는 없음
    
     
    
- react 18 버전에서의 batching과 적용 할 때 생각해야 할 점.
    
    ```jsx
    // batching을 막고 싶을 때
    import { flushSync } from 'react-dom'; // Note: react-dom, not react
    
    function handleClick() {
      flushSync(() => {
        setCounter(c => c + 1);
      });
      // React has updated the DOM by now
      flushSync(() => {
        setFlag(f => !f);
      });
      // React has updated the DOM by now
    }
    ```
    
    [https://jcon.tistory.com/191](https://jcon.tistory.com/191)
    
    [https://jcon.tistory.com/192](https://jcon.tistory.com/192)
    
    [https://velog.io/@dkdlel102/Next.js-React-18-TS-React-query에서-QueryClientProvider에-IntrinsicAttributes-에러가-발생할-때-해결-방법](https://velog.io/@dkdlel102/Next.js-React-18-TS-React-query%EC%97%90%EC%84%9C-QueryClientProvider%EC%97%90-IntrinsicAttributes-%EC%97%90%EB%9F%AC%EA%B0%80-%EB%B0%9C%EC%83%9D%ED%95%A0-%EB%95%8C-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95)
    
    [https://disquiet.io/product/프밍](https://disquiet.io/product/%ED%94%84%EB%B0%8D)