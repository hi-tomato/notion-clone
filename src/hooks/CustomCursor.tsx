import React, { useEffect, useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [angle, setAngle] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const prevPosRef = useRef<Position>({ x: 0, y: 0 });

  const cursorSize = 64; // 기존 28px에서 64px로 크기 증가

  const calculateAngle = (prevPos: Position, newPos: Position): number => {
    const dx = newPos.x - prevPos.x;
    const dy = newPos.y - prevPos.y;

    if (dx === 0 && dy === 0) {
      return angle;
    }

    const radians = Math.atan2(dx, -dy);
    return radians * (180 / Math.PI);
  };

  useEffect(() => {
    document.body.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      // clientX/Y를 사용하여 뷰포트 기준 위치를 가져옵니다
      const currentPos: Position = { x: e.clientX, y: e.clientY };
      setPosition(currentPos);

      if (!isVisible) {
        setIsVisible(true);
      }

      if (
        prevPosRef.current.x !== currentPos.x ||
        prevPosRef.current.y !== currentPos.y
      ) {
        const newAngle = calculateAngle(prevPosRef.current, currentPos);
        setAngle(newAngle);
        prevPosRef.current = { ...currentPos };
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.style.cursor = 'auto'; // 원래 커서로 복원
    };
  }, [angle, isVisible]);

  if (!isVisible) return null;

  // 커서 크기에 맞게 오프셋 값을 조정합니다
  const offsetX = -cursorSize / 3; // 약 -21px
  const offsetY = -cursorSize / 3; // 약 -21px

  return (
    <div
      className="custom-cursor"
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
        transform: `translate(${offsetX}px, ${offsetY}px) rotate(${angle}deg)`,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 28 28">
        <g fill="white" stroke="black" strokeWidth="0.5">
          <g transform="rotate(23.183768,14.619298,18.982449)">
            <rect
              x="12.5"
              y="13.6"
              transform="matrix(0.9221,-0.3871,0.3871,0.9221,-5.7605,6.5909)"
              width="2"
              height="8"
            />
            <polygon points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default CustomCursor;
