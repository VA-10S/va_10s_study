# New Suspense SSR Architecture in React 18

날짜: May 9, 2022
주제: React18

[Upgrading to React 18 on the server · Discussion #22 · reactwg/react-18](https://github.com/reactwg/react-18/discussions/22)

[New Suspense SSR Architecture in React 18 · Discussion #37 · reactwg/react-18](https://github.com/reactwg/react-18/discussions/37)

[Replacing render with createRoot · Discussion #5 · reactwg/react-18](https://github.com/reactwg/react-18/discussions/5)

[데이터를 가져오기 위한 Suspense (실험 단계) - React](https://ko.reactjs.org/docs/concurrent-mode-suspense.html#solving-race-conditions-with-suspense)

[사용자 경험 개선 1편 - react suspense](https://tecoble.techcourse.co.kr/post/2021-07-11-suspense/)

[billowing-darkness-tv766](https://codesandbox.io/s/frosty-hermann-bztrp?file=/src/fakeApi.js:16-32)

[Remix - Build Better Websites](https://remix.run/)

- 잘 지내시죠 여러분...? 😲
    
     ㅋㅋㅋㅋ
    
    [https://www.youtube.com/watch?v=EpobdV3-Ctg](https://www.youtube.com/watch?v=EpobdV3-Ctg)
    

- **Suspense SSR Architecture in React 18**
    - 효정
        
        React 18 - ssr의 구조적인 문제점을 해결했다.
        
        ssr은 서버상의 리액트 컴포넌트를 이용하여 HTML을 만들어 유저에게 보낸다.
        
        순서 = 
        서버에서 전체 앱에 사용한 데이터 로딩 
          → 서버는 HTML로 렌더링한 후 응답 보냄  
          → 클라이언트에서 JS 불러오기 
          → 클라이언트에서 서버에서 보낸 HTML에 JS 로직 연결
        
        문제점
        
        1. 전체 앱에 대한 작업을 완료해야 다음 단계로 넘어갈 수 있음
        2. 큰 프로젝트의 경우 비효율적임
        
        해결방법
        
        1. `<Suspense>`
            
            모든 데이터를 불러올 필요없이 화면의 일부로 쪼개서 해당 작업을 지연시킨 후 HTML작업이 완료되면 나중에 들어올 수 있도록 한다.
            
        2. `React.lazy` 
            
            화면 일부의 JS 코드를 `React.lazy` 로 코드 스플리팅하여 메인 번들에서 분리시킬 수 있다.
            코드 일부가 로딩될 때마다 하이드레이션이 진행된다(Seletive Hydration).
            
        3. 하이드레이션 (이벤트가 등록되는?)우선순위
            
            유저의 상작용(ex. 클릭 이벤트)을 기반으로 화면상 가장 급한 부분에 하이드레이션 우선순위를 부여한다. 
            
            질문 : 클릭  후 하이드레이션 순위는? → 수정님의 서스펜스 순서 참고
            
        
    - 수정
        - 기존 ssr의 단점
            - “waterfall”: fetch data (server) → render to HTML (server) → load code (client) → hydrate (client).
                - 뭐 하나 보여주려면 **모든걸** 먼저 fetching 해야함
                - 뭐 하나 hydrate 하려면 **모든걸** 먼저 load 해야함
                - 뭐 하나 interact 하려면 **모든걸** 먼저 hydrate 해야함
        - suspense 의 두둥등장
            - server 에서 html streaming 가능
                - 기존에 `renderToString`  을 사용했다면 `renderToPipeableStream` 사용하기.
            - client 쪽에서 선택적으로 hydration 가능
                - `[hydrateRoot](https://github.com/reactwg/react-18/discussions/5)` 랑 suspense 같이 쓰기.
                
            - suspense 예시
            
            ```jsx
            <Layout>
              <NavBar />
              <Sidebar />
              <RightPane>
                <Post />
                <Suspense fallback={<Spinner />}>
                  <Comments />
                </Suspense>
              </RightPane>
            </Layout>
            ```
            
            - Comment 가 HTML streaming 해줄 때까지 기다리지 않아도 됨. (준비 안됐으면 html에서 찾아볼 수 없음)
            - Comments 가 server 에서 준비가 완료되면 react가 minimalized 된 inline <script> 태그를 Comments 자리에 쓱 끼워넣음
            
            ```jsx
            <div hidden id="comments">
              <!-- Comments -->
              <p>First comment</p>
              <p>Second comment</p>
            </div>
            <script>
              // This implementation is slightly simplified
              document.getElementById('sections-spinner').replaceChildren(
                document.getElementById('comments')
              );
            </script>
            ```
            
            - 성공적 **끼워넣기**..!
            
        - top-down order 일 필요가 없으므로 화면 내 어떤 순서의 컴포넌트에도 사용이 가능하다.
        
        - lazy 의 등장
            - 모든 코드가 loading 되기 전에 lazy를 이용, loading 되기 전에도 page hydrating 이 가능하다. ⇒ 선택적 hydration 가능!
            - lazy 와 suspense 가 모두 적용된 코드
            
            ```jsx
            import { lazy } from 'react';
            
            const Comments = lazy(() => import('./Comments.js'));
            
            // ...
            
            <Suspense fallback={<Spinner />}>
              <Comments />
            ```
            
            - Comments 가 로딩중이라도 사이드바 나 메뉴나 기타 다른 부분들이 hydrated 되었으면 다른 부분들 클릭 & interaction 가능함.
            - lazy 걸린게 여러개 있을 때에는 dom tree의 top to down 순서로 먼저 hydration 됨.
            
            ```jsx
            <Layout>
              <NavBar />
              <Suspense fallback={<Spinner />}>
                <Sidebar />
              </Suspense>
              <RightPane>
                <Post />
                <Suspense fallback={<Spinner />}>
                  <Comments />
                </Suspense>
              </RightPane>
            </Layout>
            ```
            
            - 이 경우 sidebar 먼저 hydration 되므로, Comments 를 기다리지 않고 바로 Sidebar 를 눌러서 원하는 다른 메뉴로 이동 가능.
            
            - 출처: **[New Suspense SSR Architecture in React 18](https://github.com/reactwg/react-18/discussions/37)**
        
        - 번외고민: 그럼 어디에만 essential 하게 사용할 수 있을까
            - user’s viewpoint에 안 보이는 부분에 사용하기 (ex. 엄청 긴 페이지에서 유저에게 맨 처음 안 보이는, fold 된 밑부분) - lightHouse 로 어디에 쓸지 파악하자
            - 상대적으로 덜 중요한 부분에 사용하기
                - 모든 브라우저가 지원하는 것은 아직 아님.
            - search engine optimization (SEO) 에 중요하지 않은 부분에 사용하기
            - 서치엔진이 크롤링을 통해 page indexing 할 때, lazy loading 걸린 부분을 모두 다 볼 수 없다. 왜냐면 유저와의 인터랙션이 있어야 보이는 경우도 있을테니.
            
             
            
            seo에 중요하게 걸려야하는 키워드는 메타 태그로 위로 올린다(?)
            
            - 출처: ****[Effects of Too Much Lazy Loading on Web Performance](https://blog.bitsrc.io/effects-of-too-much-lazy-loading-on-performance-4dbe8df33c37)****
            
            ### 질문
            
            - html 나오고 suspense 부분은 다시 서버로 http 요청을 보내나요?
            
            → 요청을 다시 보내는건 아님
            
    - 서준
        
        ### 기존 SSR의 문제점
        
        1. 
        
        ### React 18
        
        - Suspence
            - remix 기능과 비슷
        - 
        
    - 하윤
        
        [https://www.notion.so/Suspense-with-0d880eeac25c46eebb136212f1e4195f](https://www.notion.so/Suspense-with-0d880eeac25c46eebb136212f1e4195f)
        
    - 철희
        - ssr, ssg, csr에 대한 이야기.
            - csr
                - 빌드 → html, js, css → 서버 html, js, css([example.com](http://example.com)) → example.com → html 렌더 → js [example.com](http://example.com)/static/index.js → html tag, event → 화면 뜸
            - ssr
                - 서버에 html 만들수 있는 자바스트 파일 → [example.com](http://example.com) → 서버에서 html 만들어서 → 브라우저 렌더
            - ssg
                - 페이지별로 html 뼈다구를 다만들고 서버에 오려서 이후 같다.
        - ssr도 느리면 결국 늦게 뜨는 것 같은데, s3에서 빌드만 하는 현재 리액트 상황에서 s3가 서버사이드 렌더링을 빠르게 지원할까?
            - vercel도 있으니 괜찮을 거 같기도하고 → 서버는 필요하지 않을까?
            - html만 따로 생성하는 방식으로 이해됨.
            - [https://codesandbox.io/s/intelligent-sammet-7kzlgy?file=/src/index.js](https://codesandbox.io/s/intelligent-sammet-7kzlgy?file=/src/index.js)
        - 과연 next를 쓰는 것보다 좋은 대안이 될까? 👍🏻
            - suspence를 사용하려면 `import { hydrateRoot } from "react-dom/client";`  , sever에서 렌더에 관련된 로직도 필요한 것으로 보임
        
        결론: suspence 어렵다.
        
        [](https://github.com/reactjs/rfcs/pull/220)
        
    - 현
        
        ```jsx
        // SSR
        if (HTMLfetched) {
          render("non-interactive but existing HTML");
        } else if (hydrated) {
          render("fully interactive HTML");
        }
        
        // Suspense
        if (dataFetched) {
          render("component with data");
        } else {
          render("fallback spinner");
        }
        ```
        
        - 상태관리와 함께 적용하려면 Suspense 단위로 상태관리도 쪼개주어야 할까? 만약 상태가 충분히 잘 나뉘어 있지 않다면 이런 일이 생기는 것일지 - [https://github.com/reactwg/react-18/discussions/38#discussioncomment-837161](https://github.com/reactwg/react-18/discussions/38#discussioncomment-837161)
        - [https://github.com/reactwg/react-18/discussions/130](https://github.com/reactwg/react-18/discussions/130)
        - Header (fully interactive HTML) / Content (HTML 뼉다구)
            - fallback이 돈다는 것 자체가 hydrate가 끝났다는 것
    - 은빈
        
        ### **Transition**
        
        1. Urgent updates: 버튼 클릭, 키보드 입력과 같이 직관적으로 보았을 때 업데이트가 즉각적으로 일어나는 것을 기대하는 상태 값들을 대상으로 합니다.
        
        2. Transition updates: 사용자가 상태 값의 변화에 따른 모든 업데이트가 뷰에 즉각적으로 일어나는 것을 기대하지 않습니다.
        
        어디에 이용하면 좋을까: 
        
        - 검색 사이트에서 auto complete 기능이나 검색 필터링 기능
        - 스크롤 이벤트를 감지해서 UI가 변화해야하는 경우, 그러나 즉각적으로 변할 필요는 없는 경우
        - 로그인, 비밀번호 타이핑 시 유효성 검사
        
        ```jsx
        const AuthInput = ({ title, type }: IAuthInput) => {
          const [inputValue, setInputValue] = useState<string>('');
        
          const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
            debouncedInputValidator(e.target.value);
          };
        
          const inputValidator = (input: string) => {
            return REGEX.E_MAIL.test(input);
          };
        
          const debouncedInputValidator = useMemo(
            () => debounce(inputValidator, 300),
            [],
          );
        
          // ...
        };
        
        import { useTransition } from 'react';
        
        const AuthInput = () => {
        	const [isPending, startTransition] = useTransition();
        
          // ...
        
          const inputValidator = (input: string) => {
            return REGEX.E_MAIL.test(input);
          };
        
        	const handleChange = (e) => {
        		const input = e.target.value;
        
        		setInputValue(e.target.value);
        
        		startTransition(() => {
        		  inputValidator(e.target.value);
        		});
        	}
        
          // ...
        }
        ```
        
        UI 업데이트를 위해 크고 복잡한 일을 함으로 써 대기 시간이 발생하거나 느린 네트워크 환경에서 데이터를 받아오기 위해 기다리는 상황
        
    
- 스터디 하실래요?
    
    읽을 책
    
    1. 자바스크립트 완벽 가이드: 👍 👍 👍
    2. 컴퓨터 구조와 프로그래밍 👍 💪 👍 
    3. 클린코드  
    4. 리팩토링 
    5. 실용주의 프로그래머
    6. 유돈노 제이에스 
    
    이야기할 주제
    
    1. **[React 18](https://reactjs.org/blog/2022/03/29/react-v18.html) 👍👍👍**
    2. CI / CD 🤩👍
    3. Docker 👍
    4. 철학 
    
    스터디 진행 방식
    
    - 매주 수요일 참여 인원 확인 + 발표자 선정 + 스케줄 확인
    - 매주 2인 발표자
    - 구글 밋 초대
    - 금요일 주제 투표(?)
    - 월 말 회고
        - 스터디 회고
        - 개인 회고