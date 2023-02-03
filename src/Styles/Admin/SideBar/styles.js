import styled from "styled-components";
import {btnReset, v} from "../AdminLayout/variables";
import {Link} from "react-router-dom";

export const SSideBar = styled.div`
  width: ${({isOpen}) => !isOpen ? 'auto' : v.sideBarWidth};
  background: ${({theme}) => theme.palette.bg.main};
  height: 100vh;
  position: relative;
  padding: ${v.lgSpacing};
  
`
export const SSidebarButton = styled.button`
  ${btnReset};
  position: absolute;
  top: ${v.xxlSpacing};
  right: ${({isOpen}) => isOpen ? '-16px' : '-40px'};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({theme}) => theme.palette.bg.main};
  box-shadow: 0 0 4px 0 ${({theme}) => theme.palette.bg3.main}, 0 0 7px 0 ${({theme}) => theme.palette.bg.main};
  color: ${({theme}) => theme.palette.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: ${({ isOpen }) => (!isOpen ? `rotate(180deg)` : `initial`)};


`;

export const SLogo = styled.div`
  width: 52px;
  
  img {
    max-width: 100%;
    height: auto;
  }

  cursor: pointer;
  margin-bottom: ${v.lgSpacing};
`

export const SSearch = styled.div`
  background: ${({theme}) => theme.palette.bgAlpha.main};
  border-radius: ${v.borderRadius};
  border: 1px solid ${({theme}) => theme.palette.bg3.main};

  input {
    padding: 0 ${v.smSpacing};
    font-family: inherit;
    letter-spacing: inherit;
    font-size: 16px;
    width: 100%;
    outline: none;
    border: none;
    background: transparent;
    color: inherit;
  }

  display: flex;
`;
export const SSearchIcon = styled.button`
  ${btnReset};
  display: flex;
  padding: calc(${v.mdSpacing} - 2px) ${v.mdSpacing});
  display: flex;
  color: ${({theme}) => theme.palette.text.primary};
  cursor: pointer;
  align-items: center;

  svg {
    font-size: 20px;
  }
`;

export const SDivider = styled.div`
  height: 1px;
  width: 100%;
  background: ${({theme}) => theme.palette.bg3.main};
  margin: ${v.lgSpacing} 0;
`;

export const SLinkContainer = styled.div`
  background: ${({theme, isActive}) => (!isActive ?  'transparent' :  theme.palette.bg3.main)};
  border-radius: ${v.borderRadius};
  margin: 8px 0;

  :hover {
    box-shadow: inset 0 0 0 1px ${({theme}) => theme.palette.bg3.main};
  }
`;

export const SLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({theme}) => theme.palette.text.primary};
  font-size: 16px;
  padding: calc(${v.mdSpacing} - 2px) 0;
`;

export const SLinkIcon = styled.div`
  padding: ${v.mdSpacing} ${v.mdSpacing};
  display: flex;
  color: ${({theme}) => theme.palette.text.primary};

  svg {
    font-size: 20px;
  }
`;
export const SLinkLabel = styled.span`
  display: block;
  flex: 1;
  margin-left: ${v.smSpacing};
`;

export const SLinkNotification = styled.div`
  padding: calc(${v.smSpacing} / 2) ${v.smSpacing};
  border-radius: calc(${v.borderRadius} / 2);
  background: ${({theme}) => theme.palette.primary.main};
  
  margin-right: ${v.mdSpacing};
`;

export const STheme = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;

export const SThemeLabel = styled.span`
  display: block;
  color: ${({theme}) => theme.palette.text.primary};
  flex: 1;
`;

export const SThemeToggler = styled.button`
  ${btnReset};
  margin: 0 auto;
  cursor: pointer;
  width: 36px;
  height: 20px;
  border-radius: 10px;
  background: ${({theme, isActive}) => (!isActive ? theme.palette.bg3.main : theme.palette.primary.main)};
  position: relative;
`;

export const SToggleThumb = styled.div`
  height: 18px;
  width: 18px;
  position: absolute;
  top: 1px;
  bottom: 1px;
  transition: 0.2s ease right;
  right: calc(100% - 18px - 1px);
  border-radius: 50%;
  background: ${({theme}) => theme.palette.bg.main};
`;