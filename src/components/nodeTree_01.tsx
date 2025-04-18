import {
  FC,
  createContext,
  useContext,
  useEffect,
  CSSProperties,
  useState,
  useRef,
  useMemo,
  RefObject,
} from "react";
import css from "./../styles/nodeTree_01.module.scss";
import { RiMenu4Fill } from "react-icons/ri";
const nodeWidth: number = css.nodeWidth as unknown as number;
const nodeHeight: number = css.nodeHeight as unknown as number;

// ? INTERFACES
interface NodeComponentProps {
  name: string;
  level?: number;
  nodes: NodeComponentProps[];
  defaultOpen?: boolean;
  style?: CSSProperties;
  propagatedOpen?: boolean | null;
  parentOffset?: Offset;
  siblings?: number;
  index?: number;
  alignment?: "horizontal" | "vertical";
}

interface RowComponentProps {
  level: number;
  nodes: NodeComponentProps[];
  open: boolean;
  parentOffset?: Offset;
  direction?: "horizontal" | "vertical";
}

interface Offset {
  left: number;
  top: number;
}

interface NodeTreeContextProps {
  triggerOffset: number;
  setTriggerOffset: (value: number) => void;
}

interface NodeTreeProps {
  style: CSSProperties;
  link: RefObject<HTMLDivElement>;
}

// ? CONTEXT
const NodeTreeContext = createContext<NodeTreeContextProps>({
  triggerOffset: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTriggerOffset: () => {},
});

// ? UTILS
const getRandomColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

// ? CONSTANTS
const ForceVerticalMode: string[] = ["node2"];

// ? COMPONENTS

const NodeTree: FC<NodeTreeProps> = ({ style, link }: NodeTreeProps) => {
  const [triggerOffset, setTriggerOffset] = useState<number>(0);
  const nodeTree: NodeComponentProps[] = [
    {
      name: "node1",
      nodes: [
        { name: "node4", nodes: [] },
        { name: "node5", nodes: [] },
        { name: "node6", nodes: [] },
        { name: "node7", nodes: [] },
      ],
    },
    {
      name: "node2",
      nodes: [
        { name: "node15", nodes: [] },
        { name: "node16", nodes: [] },
        { name: "node17", nodes: [] },
      ],
    },
    {
      name: "node3",
      nodes: [
        { name: "node8", nodes: [] },
        { name: "node9", nodes: [] },
        {
          name: "node10",
          nodes: [
            { name: "node12", nodes: [] },
            { name: "node13", nodes: [] },
            { name: "node14", nodes: [] },
          ],
        },
        { name: "node11", nodes: [] },
      ],
    },
  ];

  const contextValue: NodeTreeContextProps = {
    triggerOffset,
    setTriggerOffset,
  };

  return (
    <>
      <NodeTreeContext.Provider value={contextValue}>
        <div className={css.nodeTree} style={style} ref={link}>
          <Node
            name="root"
            level={0}
            nodes={nodeTree}
            defaultOpen={false}
            siblings={nodeTree.length}
            index={0}
          />
        </div>
      </NodeTreeContext.Provider>
    </>
  );
};

const Node: FC<NodeComponentProps> = ({
  name,
  level,
  nodes,
  style = {},
  defaultOpen = false,
  propagatedOpen = null,
  alignment = "horizontal",
  siblings = 1,
  index = -1,
}: NodeComponentProps) => {
  const { triggerOffset, setTriggerOffset } = useContext(NodeTreeContext);
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const [showLines, setShowLines] = useState<boolean>(false);
  const onClick = (): void => {
    setOpen((prev) => !prev);
    setTriggerOffset(Math.random());
  };
  const ref = useRef<HTMLDivElement>(null);
  const timeout = useRef<number>(-1);
  const [offset, setOffset] = useState<Offset>({
    left: 0,
    top: 0,
  });
  const color = useMemo(() => getRandomColor(), []);

  const getOffset = (): void => {
    if (ref.current) {
      const { left, top } = ref.current.getBoundingClientRect();
      setOffset({ left, top });
    }
  };

  useEffect(() => {
    if (propagatedOpen !== null) {
      if (!propagatedOpen) {
        setOpen(false);
        setShowLines(false);
        setTriggerOffset(Math.random());
      } else {
        setShowLines(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propagatedOpen]);

  useEffect(() => {
    getOffset();
    window.addEventListener("resize", getOffset);
    return () => window.removeEventListener("resize", getOffset);
  }, [ref]);

  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => {
      getOffset();
    }, 500);
    return () => {
      clearTimeout(timeout.current);
    };
  }, [triggerOffset]);

  const isVerticalMode = ForceVerticalMode.includes(name);

  return (
    <>
      <div className={css.nodeContainer} style={style}>
        {level !== 0 && alignment === "horizontal" && (
          <>
            <div
              style={{
                [index === 0 ? "right" : "left"]: 0,
                ...((index as number) > 0 && index < siblings - 1
                  ? { width: "100%" }
                  : {}),
              }}
              className={`${css.nodeConnector} ${
                showLines ? css.showLine : ""
              }`}
            ></div>
          </>
        )}
        {level !== 0 && alignment === "vertical" && (
          <>
            {index === 0 && (
              <div
                className={`${css.nodeFirstVerticalConnector} ${
                  showLines ? css.showLine : ""
                }`}
              ></div>
            )}
            <div
              style={{
                ...(index < siblings - 1 ? { height: "100%" } : {}),
              }}
              className={`${css.nodeConnectorVertical} ${
                showLines ? css.showLine : ""
              }`}
            ></div>
          </>
        )}
        {/* ------------------------------------------------------------ */}
        <div
          ref={ref}
          className={`${css.node} ${css[alignment]}`}
          onClick={onClick}
          style={{
            boxShadow: `0 0 8px 0 rgba(0,0,0,0.2), -0.3vw 0 0 0 ${color}`,
          }}
        >
          {level !== 0 && (
            <div
              className={`${css.topNodeLine}  ${showLines ? css.showLine : ""}`}
            />
          )}
          <div className={css.topContainer}>
            <div className={css.textContainer}>
              <span>{name}</span>
              <span>subtitle</span>
            </div>
            <div className={css.new}>
              <span>15</span>
            </div>
          </div>
          <div className={css.bottomContainer}>
            <span>Another data</span>
            <div className={css.menu}>
              <RiMenu4Fill />
            </div>
          </div>
          {nodes.length > 0 && (
            <div
              className={`${css.bottomNodeLine} ${open ? css.showLine : ""}`}
            />
          )}
        </div>
        {/* ------------------------------------------------------------ */}
        {nodes.length > 0 && (
          <>
            <Row
              level={(level as number) + 1}
              nodes={nodes}
              open={open}
              parentOffset={offset}
              direction={isVerticalMode ? "vertical" : "horizontal"}
            />
          </>
        )}
      </div>
    </>
  );
};

const Row: FC<RowComponentProps> = ({
  level,
  nodes,
  open,
  parentOffset = { left: 0, top: 0 },
  direction = "horizontal",
}: RowComponentProps) => {
  const sideValue = direction === "horizontal" ? nodeWidth : nodeHeight;
  const property = direction === "horizontal" ? "marginLeft" : "marginTop";
  const valueToOpen = `calc(-${nodes.length * sideValue}px - ${
    nodes.length * 2
  }vw - 0.3vw)`;

  const style: CSSProperties = {
    [property]: open ? 0 : valueToOpen,
  };

  const rowStyle: CSSProperties = {
    opacity: open ? 1 : 0,
    marginTop: open ? 0 : "-63px",
  };
  return (
    <>
      <div className={`${css.row} ${css[direction]}`} style={rowStyle}>
        {nodes.map((node, index, array) => (
          <Node
            key={index}
            index={index}
            siblings={array.length}
            style={index === nodes.length - 1 ? style : {}}
            name={node.name}
            level={level}
            alignment={direction}
            nodes={node.nodes}
            propagatedOpen={open}
            parentOffset={parentOffset}
          />
        ))}
      </div>
    </>
  );
};

export default NodeTree;
