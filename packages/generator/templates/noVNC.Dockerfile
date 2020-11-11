FROM devimage

### noVNC.Dockerfile

RUN  apt-get update \
  && apt-get install --install-recommends -y \
    autocutsel \
    xfwm4 \
    # xvfb \
    novnc \
    # websockify \
    tigervnc-standalone-server \
  && yarn global add @novnc/novnc \ 
  && cp /usr/share/novnc/vnc.html /usr/share/novnc/index.html \
  && sed -i -e '1 aautocutsel -fork' /etc/X11/Xvnc-session \
  && sed -i -e 's/iconic/nowin/g' /etc/X11/Xvnc-session \
  && sed -i -e 's/workspace_count=4/workspace_count=1/g' /usr/share/xfwm4/defaults \
  && sed -i -e 's/use_compositing=true/use_compositing=false/g' /usr/share/xfwm4/defaults \
  && sed -i -e '1 aterminator &' /etc/X11/Xvnc-session \
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* \
  && echo "((chmod 644 ~/.ssh/*.pub && chmod 600 ~/.ssh/id_rsa && chmod 600 ~/.gitconfig) || true ) && (vncserver -SecurityTypes none -cleanstale -useold :1 -localhost no --I-KNOW-THIS-IS-INSECURE && websockify --web=/usr/share/novnc/ --wrap-mode=ignore 6080 localhost:5901 || echo ok)" >> /usr/bin/startx
